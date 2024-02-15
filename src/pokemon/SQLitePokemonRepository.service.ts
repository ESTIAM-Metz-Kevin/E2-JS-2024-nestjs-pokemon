import { DataSource } from 'typeorm';

import { Pokemon } from './models';
import { PokemonRepository } from './pokemonRepository.interface';
import { PokemonEntity } from './pokemon.entity';

export class SQLitePokemonRepository implements PokemonRepository {
  constructor(private readonly dataSource: DataSource) {}

  private get pokemonTable() {
    return this.dataSource.getRepository(PokemonEntity);
  }

  async findAll(): Promise<Pokemon[]> {
    // Pas besoin de transformer le tableau PokemonEntity en tableau Pokemon
    // Les types se superposent pour l'instant (ils sont pareil, même structure)
    return this.pokemonTable.find();
  }

  findOne(id: number): Promise<Pokemon | undefined> {
    return this.pokemonTable.findOne({
      where: {
        id,
      },
    });
  }

  async create(pokemon: Pokemon): Promise<void> {
    try {
      await this.pokemonTable.save(pokemon);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, pokemon: Omit<Pokemon, 'id'>): Promise<void> {
    try {
      await this.pokemonTable.update(id, pokemon);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.pokemonTable.delete(id);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
