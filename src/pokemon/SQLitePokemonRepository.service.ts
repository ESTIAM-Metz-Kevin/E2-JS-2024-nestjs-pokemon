import { DataSource } from 'typeorm';

import { Pokemon } from './models';
import { PokemonRepository } from './pokemonRepository.interface';

export class SQLitePokemonRepository implements PokemonRepository {
  constructor(private readonly dataSource: DataSource) {}

  findAll(): Pokemon[] {
    throw new Error('not implemented');
  }
  findOne(id: number): Pokemon | undefined {
    throw new Error('not implemented');
  }
  create(pokemon: Pokemon): boolean {
    throw new Error('not implemented');
  }
  update(id: number, pokemon: Omit<Pokemon, 'id'>): boolean {
    throw new Error('not implemented');
  }
  delete(id: number): boolean {
    throw new Error('not implemented');
  }
}
