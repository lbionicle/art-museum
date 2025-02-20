import { z } from 'zod';

export const searchSchema = z
  .string()
  .trim()
  .min(1, 'Minimum length 1 character')
  .max(100, 'Maximum length 100 characters');

export const thumbnailSchema = z.object({
  lqip: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  width: z
    .number()
    .nullable()
    .transform((val) => val ?? 0),
  height: z
    .number()
    .nullable()
    .transform((val) => val ?? 0),
  alt_text: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
});

export const dataSchema = z.object({
  id: z
    .number()
    .nullable()
    .transform((val) => val ?? 0),
  title: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  thumbnail: thumbnailSchema
    .nullable()
    .transform((val) => val ?? { lqip: '', width: 0, height: 0, alt_text: '' }),
  date_start: z
    .number()
    .nullable()
    .transform((val) => val ?? 0),
  date_end: z
    .number()
    .nullable()
    .transform((val) => val ?? 0),
  date_display: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  artist_display: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  short_description: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  dimensions: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  credit_line: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  is_public_domain: z
    .boolean()
    .nullable()
    .transform((val) => val ?? false),
  on_loan_display: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  artist_title: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  image_id: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
});

export const configSchema = z.object({
  iiif_url: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  website_url: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
});

export const artworkApiResponseSchema = z.object({
  data: dataSchema.nullable().transform(
    (val) =>
      val ?? {
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
  ),
  config: configSchema.nullable().transform((val) => val ?? { iiif_url: '', website_url: '' }),
});
