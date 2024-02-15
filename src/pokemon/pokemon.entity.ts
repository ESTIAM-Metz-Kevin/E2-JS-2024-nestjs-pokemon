import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class PokemonEntity {
  @PrimaryColumn()
  @Index({ unique: true })
  id: number;

  @Column()
  name: string;
}
