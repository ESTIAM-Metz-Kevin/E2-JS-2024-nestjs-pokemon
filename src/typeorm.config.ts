import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PokemonEntity } from './pokemon/pokemon.entity';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './db/estiam.sqlite',
  entities: [PokemonEntity],
  synchronize: true, // Not in production
  logging: true, // Not in production
};

export default config;
