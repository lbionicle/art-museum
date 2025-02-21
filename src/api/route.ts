import axios, { AxiosError } from 'axios';
import { z } from 'zod';

import {
  artworkApiResponseSchema,
  dataSchema,
  paginatedArtworkResponseSchema,
  searchSchema,
} from './schema';
import defaultImage from '@/assets/images/default-art.svg';
import {
  ARTWORK_ID_ENDPOINT,
  ARTWORKS_ENDPOINT,
  IMAGE_ENDPOINT,
  MAIN_PAGE_PAGINATION_LIMIT,
  MAIN_PAGE_RECOMMENDAION_LIMIT,
  SEARCH_ENDPOINT,
  SEARCH_PAGE_LIMIT,
} from '@/constants';

export function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

const transformArtworkData = (IIIFUrl: string, artwork: z.infer<typeof dataSchema>) => {
  const {
    id,
    title,
    image_id,
    thumbnail,
    artist_title,
    is_public_domain,
    credit_line,
    dimensions,
    date_end,
    date_start,
    artist_display,
    on_loan_display,
    date_display,
  } = artwork;
  return {
    id,
    title,
    artist: artist_title,
    isPublic: is_public_domain,
    dateDisplay: date_display,
    dateStart: date_start,
    dateEnd: date_end,
    image: {
      src: image_id ? IMAGE_ENDPOINT(IIIFUrl, image_id) : defaultImage,
      alt: thumbnail.alt_text ?? title,
    },
    nationality: artist_display,
    dimensions,
    creditLine: credit_line,
    repository: on_loan_display,
  };
};

export const getArtworkDetail = async (id: number) => {
  const res = await axios.get(ARTWORK_ID_ENDPOINT(id));

  const parsedResponse = artworkApiResponseSchema.safeParse(res.data);

  if (!parsedResponse.success) {
    console.error('Validation error:', parsedResponse.error.errors);
    return null;
  }

  return transformArtworkData(parsedResponse.data.config.iiif_url, parsedResponse.data.data);
};

export const searchArtwork = async (query: string, limit: number = SEARCH_PAGE_LIMIT) => {
  const result = searchSchema.safeParse(query);
  if (!result.success) {
    console.warn('Validation error:', result.error.errors);
    return;
  }

  const safeQuery = encodeURIComponent(result.data);

  const res = await axios.get(SEARCH_ENDPOINT(safeQuery, limit));

  const artworks = res.data.data;

  const detailedArtworks = await Promise.all(
    artworks.map((artwork: { id: number }) => getArtworkDetail(artwork.id)),
  );

  return detailedArtworks;
};

export const fetchPaginatedArtworks = async (
  page: number = 1,
  limit: number = MAIN_PAGE_PAGINATION_LIMIT,
  fields?: string[],
) => {
  const params: { page: number; limit: number; fields?: string } = { page, limit };
  if (fields && fields.length > 0) {
    params.fields = fields.join(',');
  }

  const res = await axios.get(`${ARTWORKS_ENDPOINT}/artworks`, { params });

  const parsedResponse = paginatedArtworkResponseSchema.safeParse(res.data);
  if (!parsedResponse.success) {
    console.warn('Validation error:', parsedResponse.error.errors);
    return;
  }

  const { config, data: artworks } = parsedResponse.data;
  const iiif_url = config.iiif_url;

  const transformedArtworks = artworks.map((artwork) => transformArtworkData(iiif_url, artwork));

  return {
    artworks: transformedArtworks,
    pagination: parsedResponse.data.pagination,
  };
};

export const fetchRandomPaginatedArtworks = async (
  limit: number = MAIN_PAGE_RECOMMENDAION_LIMIT,
) => {
  const firstPageData = await fetchPaginatedArtworks(1, limit);
  if (!firstPageData || !firstPageData.pagination) {
    return firstPageData;
  }

  const totalPages = firstPageData.pagination.total_pages;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;

  if (randomPage === 1) {
    return firstPageData;
  }

  return await fetchPaginatedArtworks(randomPage, limit);
};
