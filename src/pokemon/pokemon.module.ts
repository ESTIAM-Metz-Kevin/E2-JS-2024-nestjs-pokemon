import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { SQLitePokemonRepository } from './SQLitePokemonRepository.service';
import { DataSource } from 'typeorm';

@Module({
  controllers: [PokemonController],
  providers: [
    {
      provide: 'POKEMON_REPOSITORY',
      useFactory: (datasource: DataSource) => {
        return new SQLitePokemonRepository(datasource);
      },
      inject: [DataSource],
    },
  ],
})
export class PokemonModule {}
