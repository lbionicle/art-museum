import axios from 'axios';
import {
  isAxiosError,
  getArtworkDetail,
  searchArtwork,
  fetchPaginatedArtworks,
  fetchRandomPaginatedArtworks,
} from '@/api/route';
import {
  IMAGE_ENDPOINT,
  ARTWORK_ID_ENDPOINT,
  SEARCH_ENDPOINT,
  ARTWORKS_ENDPOINT,
  MAIN_PAGE_PAGINATION_LIMIT,
  MAIN_PAGE_RECOMMENDAION_LIMIT,
  SEARCH_PAGE_LIMIT,
} from '@/constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const validArtworkResponse = {
  config: {
    iiif_url: 'https://www.artic.edu/iiif/2',
    website_url: 'https://www.artic.edu',
  },
  data: {
    id: 123,
    title: 'Test Artwork',
    image_id: 'abc123',
    thumbnail: {
      alt_text: 'Test Artwork Thumbnail',
      lqip: 'data:image/png;base64,abc',
      width: 100,
      height: 200,
    },
    short_description: 'Test description',
    artist_title: 'Test Artist',
    is_public_domain: true,
    credit_line: 'Test Credit',
    dimensions: '100x200',
    date_end: null,
    date_start: null,
    artist_display: 'Test Nationality',
    on_loan_display: 'Test Repository',
    date_display: '2020',
  },
};

const transformedArtwork = {
  id: 123,
  title: 'Test Artwork',
  artist: 'Test Artist',
  isPublic: true,
  dateDisplay: '2020',
  dateStart: null,
  dateEnd: null,
  image: {
    src: IMAGE_ENDPOINT('https://www.artic.edu/iiif/2', 'abc123'),
    alt: 'Test Artwork Thumbnail',
  },
  nationality: 'Test Nationality',
  dimensions: '100x200',
  creditLine: 'Test Credit',
  repository: 'Test Repository',
};

describe('isAxiosError', () => {
  test('returns true for axios error', () => {
    const error = { isAxiosError: true };
    expect(isAxiosError(error)).toBe(true);
  });
  test('returns false for non-axios error', () => {
    const error = { message: 'error' };
    expect(isAxiosError(error)).toBe(false);
  });
});

describe('getArtworkDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('returns transformed artwork on valid response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: validArtworkResponse });
    const result = await getArtworkDetail(123);
    expect(result).toEqual(transformedArtwork);
    expect(mockedAxios.get).toHaveBeenCalledWith(ARTWORK_ID_ENDPOINT(123));
  });
  test('returns null on invalid response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { invalid: true } });
    const result = await getArtworkDetail(123);
    expect(result).toBeNull();
  });
});

describe('searchArtwork', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('returns undefined on invalid query', async () => {
    const result = await searchArtwork('');
    expect(result).toBeUndefined();
  });
  test('returns detailed artworks on valid query', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [{ id: 123 }] } });
    mockedAxios.get.mockResolvedValueOnce({ data: validArtworkResponse });
    const result = await searchArtwork('Test');
    expect(result).toEqual([transformedArtwork]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      SEARCH_ENDPOINT(encodeURIComponent('Test'), SEARCH_PAGE_LIMIT),
    );
  });
});

describe('fetchPaginatedArtworks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const paginatedResponse = {
    config: { iiif_url: 'https://www.artic.edu/iiif/2', website_url: 'https://www.artic.edu' },
    data: [validArtworkResponse.data],
    pagination: { total_pages: 1, current_page: 1 },
  };
  test('returns transformed artworks and pagination on valid response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: paginatedResponse });
    const result = await fetchPaginatedArtworks(1, MAIN_PAGE_PAGINATION_LIMIT, [
      'field1',
      'field2',
    ]);
    expect(result).toEqual({
      artworks: [transformedArtwork],
      pagination: paginatedResponse.pagination,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(`${ARTWORKS_ENDPOINT}/artworks`, {
      params: { page: 1, limit: MAIN_PAGE_PAGINATION_LIMIT, fields: 'field1,field2' },
    });
  });
  test('returns undefined on invalid response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { invalid: true } });
    const result = await fetchPaginatedArtworks();
    expect(result).toBeUndefined();
  });
});

describe('fetchRandomPaginatedArtworks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const firstPageResponse = {
    config: { iiif_url: 'https://www.artic.edu/iiif/2', website_url: 'https://www.artic.edu' },
    data: [validArtworkResponse.data],
    pagination: { total_pages: 5, current_page: 1 },
  };
  test('returns first page if random page is 1', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: firstPageResponse });
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const result = await fetchRandomPaginatedArtworks(MAIN_PAGE_RECOMMENDAION_LIMIT);
    expect(result).toEqual({
      artworks: [transformedArtwork],
      pagination: firstPageResponse.pagination,
    });
  });
  test('returns artworks from random page if not 1', async () => {
    const randomPageResponse = {
      config: { iiif_url: 'https://www.artic.edu/iiif/2', website_url: 'https://www.artic.edu' },
      data: [validArtworkResponse.data],
      pagination: { total_pages: 5, current_page: 3 },
    };
    mockedAxios.get.mockResolvedValueOnce({ data: firstPageResponse });
    mockedAxios.get.mockResolvedValueOnce({ data: randomPageResponse });
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = await fetchRandomPaginatedArtworks(MAIN_PAGE_RECOMMENDAION_LIMIT);
    expect(result).toEqual({
      artworks: [transformedArtwork],
      pagination: randomPageResponse.pagination,
    });
  });
});
