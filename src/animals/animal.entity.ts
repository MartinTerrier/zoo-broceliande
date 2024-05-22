import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Habitat } from '../habitats/habitat.entity';
import { Species } from './species.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Species, (species) => species.id)
  species: number;

  @Column()
  status: string;

  @ManyToOne(() => Habitat, (habitat) => habitat.id)
  habitat: number;

  @Column()
  views: number;
}
