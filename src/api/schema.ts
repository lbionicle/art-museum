import { z } from 'zod';

export const searchSchema = z
  .string()
  .trim()
  .min(1, 'Minimum length 1 character')
  .max(100, 'Maximum length 100 characters');
