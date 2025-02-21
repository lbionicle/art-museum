import {
  searchSchema,
  paginationSchema,
  thumbnailSchema,
  dataSchema,
  configSchema,
  artworkApiResponseSchema,
  paginatedArtworkResponseSchema,
} from '@/api/schema';

describe('searchSchema', () => {
  test('parses valid string', () => {
    expect(searchSchema.parse('hello')).toEqual('hello');
  });
  test('trims string', () => {
    expect(searchSchema.parse('  hello  ')).toEqual('hello');
  });
  test('fails on empty string', () => {
    expect(() => searchSchema.parse('   ')).toThrow();
  });
});

describe('paginationSchema', () => {
  const validPagination = {
    total: 100,
    limit: 10,
    offset: 0,
    total_pages: 10,
    current_page: 1,
    prev_url: 'https://example.com/prev',
    next_url: 'https://example.com/next',
  };
  test('parses valid object', () => {
    expect(paginationSchema.parse(validPagination)).toEqual(validPagination);
  });
  test('parses object without optional URLs', () => {
    const input = { total: 100, limit: 10, offset: 0, total_pages: 10, current_page: 1 };
    expect(paginationSchema.parse(input)).toEqual(input);
  });
});

describe('thumbnailSchema', () => {
  test('transforms null values', () => {
    const input = { lqip: null, width: null, height: null, alt_text: null };
    expect(thumbnailSchema.parse(input)).toEqual({ lqip: '', width: 0, height: 0, alt_text: '' });
  });
  test('parses valid values', () => {
    const input = { lqip: 'x', width: 100, height: 200, alt_text: 'alt' };
    expect(thumbnailSchema.parse(input)).toEqual(input);
  });
});

describe('dataSchema', () => {
  test('transforms null values', () => {
    const input = {
      id: null,
      title: null,
      thumbnail: null,
      date_start: null,
      date_end: null,
      date_display: null,
      artist_display: null,
      short_description: null,
      dimensions: null,
      credit_line: null,
      is_public_domain: null,
      on_loan_display: null,
      artist_title: null,
      image_id: null,
    };
    expect(dataSchema.parse(input)).toEqual({
      id: 0,
      title: '',
      thumbnail: { lqip: '', width: 0, height: 0, alt_text: '' },
      date_start: 0,
      date_end: 0,
      date_display: '',
      artist_display: '',
      short_description: '',
      dimensions: '',
      credit_line: '',
      is_public_domain: false,
      on_loan_display: '',
      artist_title: '',
      image_id: '',
    });
  });
  test('parses valid data', () => {
    const input = {
      id: 123,
      title: 'Art',
      thumbnail: { lqip: 'x', width: 50, height: 60, alt_text: 'alt' },
      date_start: 1990,
      date_end: 2000,
      date_display: '1990-2000',
      artist_display: 'Artist',
      short_description: 'desc',
      dimensions: '10x10',
      credit_line: 'credit',
      is_public_domain: true,
      on_loan_display: 'loan',
      artist_title: 'Artist Title',
      image_id: 'img123',
    };
    expect(dataSchema.parse(input)).toEqual(input);
  });
});

describe('configSchema', () => {
  test('transforms null values', () => {
    const input = { iiif_url: null, website_url: null };
    expect(configSchema.parse(input)).toEqual({ iiif_url: '', website_url: '' });
  });
  test('parses valid config', () => {
    const input = { iiif_url: 'url', website_url: 'url2' };
    expect(configSchema.parse(input)).toEqual(input);
  });
});

describe('artworkApiResponseSchema', () => {
  test('transforms null values', () => {
    const input = { data: null, config: null };
    expect(artworkApiResponseSchema.parse(input)).toEqual({
      data: {
        id: 0,
        title: '',
        thumbnail: { lqip: '', width: 0, height: 0, alt_text: '' },
        date_start: 0,
        date_end: 0,
        date_display: '',
        artist_display: '',
        short_description: '',
        dimensions: '',
        credit_line: '',
        is_public_domain: false,
        on_loan_display: '',
        artist_title: '',
        image_id: '',
      },
      config: { iiif_url: '', website_url: '' },
    });
  });
  test('parses valid response', () => {
    const input = {
      data: {
        id: 1,
        title: 'Test',
        thumbnail: { lqip: 'x', width: 10, height: 20, alt_text: 'alt' },
        date_start: 1900,
        date_end: 2000,
        date_display: '1900-2000',
        artist_display: 'Artist',
        short_description: 'desc',
        dimensions: '100x100',
        credit_line: 'credit',
        is_public_domain: true,
        on_loan_display: 'loan',
        artist_title: 'Artist Title',
        image_id: 'img1',
      },
      config: { iiif_url: 'url', website_url: 'url2' },
    };
    expect(artworkApiResponseSchema.parse(input)).toEqual(input);
  });
});

describe('paginatedArtworkResponseSchema', () => {
  test('parses valid paginated response', () => {
    const input = {
      data: [
        {
          id: 1,
          title: 'Test',
          thumbnail: { lqip: 'x', width: 10, height: 20, alt_text: 'alt' },
          date_start: 1900,
          date_end: 2000,
          date_display: '1900-2000',
          artist_display: 'Artist',
          short_description: 'desc',
          dimensions: '100x100',
          credit_line: 'credit',
          is_public_domain: true,
          on_loan_display: 'loan',
          artist_title: 'Artist Title',
          image_id: 'img1',
        },
      ],
      config: { iiif_url: 'url', website_url: 'url2' },
      pagination: {
        total: 100,
        limit: 10,
        offset: 0,
        total_pages: 10,
        current_page: 1,
        prev_url: 'https://example.com/prev',
        next_url: 'https://example.com/next',
      },
    };
    expect(paginatedArtworkResponseSchema.parse(input)).toEqual(input);
  });
});
