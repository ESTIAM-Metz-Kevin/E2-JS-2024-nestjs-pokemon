import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { InMemoryPokemonRepository } from './inMemoryPokemonRepository.service';

@Module({
  controllers: [PokemonController],
  providers: [
    {
      provide: 'POKEMON_REPOSITORY',
      useClass: InMemoryPokemonRepository,
    },
  ],
})
export class PokemonModule {}
