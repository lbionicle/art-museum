import axios from 'axios';
import { searchSchema } from './schema';
import { _API_URL } from '@/constants';

export const getArtworkDetail = async (id: number) => {
  const res = await axios.get(`${_API_URL}/artworks/${id}`);
  return res.data;
};

export const searchArtwork = async (query: string, size: number = 12) => {
  const result = searchSchema.safeParse(query);
  if (!result.success) {
    console.warn('Validation error:', result.error.errors);
    return;
  }

  const safeQuery = encodeURIComponent(result.data);

  const res = await axios.get(`${_API_URL}/artworks/search`, {
    params: { q: safeQuery, size: size },
  });

  const artworks = res.data.data;

  if (!artworks || !artworks.length) {
    console.warn('No artworks found');
    return;
  }

  const detailedArtworks = await Promise.all(
    artworks.map((artwork: { id: number }) => getArtworkDetail(artwork.id)),
  );

  return detailedArtworks;
};
