import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habitat } from '../habitats/habitat.entity';
import { Species } from './species.entity';
import { AnimalImage } from './animalImage.entity';
import { Meal } from './meal.entity';
import { VetReport } from './vetReport.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  status: string;

  @JoinColumn()
  @ManyToOne(() => Species, (species) => species.id)
  species: Species;

  @JoinColumn()
  @ManyToOne(() => Habitat, (habitat) => habitat.id)
  habitat: Habitat;

  @JoinColumn()
  @OneToOne(() => AnimalImage, (animalImage) => animalImage.id)
  image: AnimalImage;

  @OneToMany(() => Meal, (meal) => meal.animal, {
    cascade: ['update', 'remove', 'insert'],
  })
  meal: Meal[];

  @OneToMany(() => VetReport, (vetReport) => vetReport.animal, {
    cascade: ['update', 'remove', 'insert'],
  })
  vetReport: VetReport[];

  @Column()
  imageId: number;
}
