export const ARTWORKS_ENDPOINT = 'https://api.artic.edu/api/v1';

export const ARTWORK_ID_ENDPOINT = (id: number) => `${ARTWORKS_ENDPOINT}/artworks/${id}`;

export const IMAGE_ENDPOINT = (IIIFUrl: string, id: number | string) =>
  `${IIIFUrl}/${id}/full/full/0/default.jpg`;

export const SEARCH_ENDPOINT = (query: string, size: number) =>
  `${ARTWORKS_ENDPOINT}/artworks/search?q=${query}&size=${size}`;

export const MAX_VISIBLE_BUTTONS = 4;

export const MAX_CHARS_SEARCH_INPUT = 100;

export const MAIN_PAGE_PAGINATION_LIMIT = 4;

export const SEARCH_PAGE_LIMIT = 9;

export const FAVORITE_PAGE_LIMIT = 6;

export const MAIN_PAGE_RECOMMENDAION_LIMIT = 9;
