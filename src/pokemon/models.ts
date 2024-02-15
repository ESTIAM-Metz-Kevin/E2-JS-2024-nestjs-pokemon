import { z } from 'zod';

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Pokemon = Required<z.infer<typeof pokemonSchema>>;
