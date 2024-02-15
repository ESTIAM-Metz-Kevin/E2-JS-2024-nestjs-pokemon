import { Pokemon } from './models';

export interface PokemonRepository {
  findAll(): Promise<Pokemon[]>;
  findOne(id: number): Promise<Pokemon | undefined>;
  create(pokemon: Pokemon): Promise<void>;
  update(id: number, pokemon: Omit<Pokemon, 'id'>): Promise<void>;
  delete(id: number): Promise<void>;
}
