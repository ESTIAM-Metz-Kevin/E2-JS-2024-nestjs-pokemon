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
  async findAll(): Promise<Pokemon[]> {
    return pokemons;
  }

  async findOne(id: number): Promise<Pokemon | undefined> {
    return pokemons.find((pokemon) => pokemon.id === id);
  }

  async create(pokemon: Pokemon): Promise<void> {
    pokemons.push(pokemon);
    // ou return; au choix
    return Promise.resolve();
  }

  async update(id: number, pokemon: Omit<Pokemon, 'id'>): Promise<void> {
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);

    if (index === -1)
      Promise.reject(new Error('Update échoué car pas de pokemon'));

    pokemons[index] = { ...pokemons[index], ...pokemon };

    // ou Promise.resolve() au choix;
    return;
  }

  delete(id: number): Promise<void> {
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);

    if (index > -1)
      Promise.reject(
        new Error('Suppression échouée car pas de pokemon trouvé'),
      );

    pokemons.splice(index, 1);
    return;
  }
}
