import { Column, Entity, Index } from 'typeorm';

@Entity()
export class PokemonEntity {
  @Index({ unique: true })
  id: number;

  @Column()
  name: string;
}
