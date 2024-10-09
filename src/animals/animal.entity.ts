import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Habitat } from '../habitats/habitat.entity';
import { Species } from './species.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @ManyToOne(() => Species, (species) => species.id)
  species: Species;

  @Column()
  speciesId: number;

  @ManyToOne(() => Habitat, (habitat) => habitat.id)
  habitat: Habitat;

  @Column()
  habitatId: number;

  @Column()
  views: number;
}
