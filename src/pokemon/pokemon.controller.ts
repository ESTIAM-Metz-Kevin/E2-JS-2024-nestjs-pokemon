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
  list(): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.findOne(id);

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    return pokemon;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(pokemonCreateSchema))
  async create(@Body() newPokemon: CreatePokemonRequest) {
    try {
      await this.pokemonRepository.create(newPokemon);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(pokemonUpdateSchema))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemon: UpdatePokemonRequest,
  ) {
    try {
      await this.pokemonRepository.update(id, updatePokemon);
    } catch (error) {
      throw new NotFoundException('Pokemon not found');
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.pokemonRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Pokemon not found');
    }
  }
}
