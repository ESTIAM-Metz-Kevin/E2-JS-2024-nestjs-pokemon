import { z } from 'zod';
import {
  Body,
  Controller,
  Delete,
  Get,
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
import { PokemonService } from './pokemon.service';

const pokemonCreateSchema = pokemonSchema.required();
const pokemonUpdateSchema = pokemonSchema.omit({ id: true });

type CreatePokemonRequest = Pokemon;
type UpdatePokemonRequest = Required<z.infer<typeof pokemonUpdateSchema>>;

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  list(): Pokemon[] {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number): Pokemon {
    const pokemon = this.pokemonService.findOne(id);

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    return pokemon;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(pokemonCreateSchema))
  create(@Body() newPokemon: CreatePokemonRequest) {
    if (!this.pokemonService.create(newPokemon))
      throw new InternalServerErrorException();
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(pokemonUpdateSchema))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemon: UpdatePokemonRequest,
  ) {
    if (this.pokemonService.update(id, updatePokemon))
      throw new NotFoundException('Pokemon not found');
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    if (this.pokemonService.delete(id))
      throw new NotFoundException('Pokemon not found');
  }
}
