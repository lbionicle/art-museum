import axios from 'axios';
import { z } from 'zod';

import {
  artworkApiResponseSchema,
  dataSchema,
  paginatedArtworkResponseSchema,
  searchSchema,
} from './schema';
import { _API_URL, IIIFParam } from '@/constants';
import defaultImage from '@/assets/images/default-art.svg';

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
  } = artwork;
  return {
    id,
    title,
    artist: artist_title,
    isPublic: is_public_domain,
    date: `${date_start}-${date_end}`,
    image: {
      src: image_id ? `${IIIFUrl}/${image_id}${IIIFParam}` : defaultImage,
      alt: thumbnail.alt_text ?? title,
    },
    nacionality: '',
    dimensions,
    creditLine: credit_line,
    repository: '',
  };
};

export const getArtworkDetail = async (id: number) => {
  const res = await axios.get(`${_API_URL}/artworks/${id}`);

  const parsedResponse = artworkApiResponseSchema.safeParse(res.data);

  if (!parsedResponse.success) {
    console.error('Validation error:', parsedResponse.error.errors);
    return null;
  }

  return transformArtworkData(parsedResponse.data.config.iiif_url, parsedResponse.data.data);
};

export const searchArtwork = async (query: string, limit: number = 6) => {
  const result = searchSchema.safeParse(query);
  if (!result.success) {
    console.warn('Validation error:', result.error.errors);
    return;
  }

  const safeQuery = encodeURIComponent(result.data);

  const res = await axios.get(`${_API_URL}/artworks/search`, {
    params: { q: safeQuery, size: limit },
  });

  const artworks = res.data.data;

  const detailedArtworks = await Promise.all(
    artworks.map((artwork: { id: number }) => getArtworkDetail(artwork.id)),
  );

  return detailedArtworks;
};

export const fetchPaginatedArtworks = async (page: number = 1, limit: number = 6) => {
  const res = await axios.get(`${_API_URL}/artworks`, { params: { page, limit } });

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
