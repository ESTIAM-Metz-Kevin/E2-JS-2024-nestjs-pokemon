import { Pokemon } from './models';

export interface PokemonRepository {
  findAll(): Pokemon[];
  findOne(id: number): Pokemon | undefined;
  create(pokemon: Pokemon): boolean;
  update(id: number, pokemon: Omit<Pokemon, 'id'>): boolean;
  delete(id: number): boolean;
}
