import { z } from 'zod';

export const constructorSchema = z.object({
  sketchUrl: z.string().url().optional(),
  colors: z.array(z.string().regex(/^#[0-9A-F]{6}$/)).max(2),
  fillings: z.array(z.string().max(50)).max(3),
  tiers: z.number().int().min(1).max(5),
});
