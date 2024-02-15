import { DataSource } from 'typeorm';

import { Pokemon } from './models';
import { PokemonRepository } from './pokemonRepository.interface';
import { PokemonEntity } from './pokemon.entity';

export class SQLitePokemonRepository implements PokemonRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<Pokemon[]> {
    // On fait un cast (mot clé: 'as') du type PokemonEntity[] vers Pokemon[] car les deux types sont identiques sur leurs champs
    // Pas besoin de transformer le tableau PokemonEntity en tableau Pokemon
    // https://www.w3schools.com/typescript/typescript_casting.php
    return this.dataSource.manager.find(PokemonEntity) as Promise<Pokemon[]>;
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
