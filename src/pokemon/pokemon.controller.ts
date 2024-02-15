import { z } from 'zod';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../zod.pipe';
import { Pokemon, pokemonSchema } from './models';
import { PokemonRepository } from './pokemonRepository.interface';

const pokemonCreateSchema = pokemonSchema.required();
const pokemonUpdateSchema = pokemonSchema.omit({ id: true });

type CreatePokemonRequest = Pokemon;
type UpdatePokemonRequest = Required<z.infer<typeof pokemonUpdateSchema>>;

@Controller('pokemons')
export class PokemonController {
  constructor(
    @Inject('POKEMON_REPOSITORY')
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  @Get()
  list(): Pokemon[] {
    return this.pokemonRepository.findAll();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number): Pokemon {
    const pokemon = this.pokemonRepository.findOne(id);

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    return pokemon;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(pokemonCreateSchema))
  create(@Body() newPokemon: CreatePokemonRequest) {
    if (!this.pokemonRepository.create(newPokemon))
      throw new InternalServerErrorException();
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(pokemonUpdateSchema))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemon: UpdatePokemonRequest,
  ) {
    if (this.pokemonRepository.update(id, updatePokemon))
      throw new NotFoundException('Pokemon not found');
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    if (this.pokemonRepository.delete(id))
      throw new NotFoundException('Pokemon not found');
  }
}
