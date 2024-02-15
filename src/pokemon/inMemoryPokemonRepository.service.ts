import { Pokemon } from './models';
import { PokemonRepository } from './pokemonRepository.interface';

const pokemons: Pokemon[] = [
  { id: 1, name: 'Bulbizarre' },
  { id: 2, name: 'Herbizarre' },
  { id: 3, name: 'Florizarre' },
  { id: 4, name: 'Salamèche' },
  { id: 5, name: 'Reptincel' },
  { id: 6, name: 'Dracaufeu' },
  { id: 7, name: 'Carapuce' },
  { id: 8, name: 'Carabaffe' },
  { id: 9, name: 'Tortank' },
  { id: 10, name: 'Chenipan' },
];

export class InMemoryPokemonRepository implements PokemonRepository {
  findAll(): Pokemon[] {
    return pokemons;
  }

  findOne(id: number): Pokemon | undefined {
    return pokemons.find((pokemon) => pokemon.id === id);
  }

  create(pokemon: Pokemon): boolean {
    pokemons.push(pokemon);
    return true;
  }

  update(id: number, pokemon: Omit<Pokemon, 'id'>): boolean {
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);

    if (index === -1) return false;

    pokemons[index] = { ...pokemons[index], ...pokemon };
    return true;
  }

  delete(id: number): boolean {
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);

    if (index > -1) return false;

    pokemons.splice(index, 1);
    return true;
  }
}
