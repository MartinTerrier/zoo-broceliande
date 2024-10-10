import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habitat } from '../habitats/habitat.entity';
import { Species } from './species.entity';
import { AnimalImage } from './animalImage.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  views: number;

  @JoinColumn()
  @ManyToOne(() => Species, (species) => species.id)
  species: Species;

  @JoinColumn()
  @ManyToOne(() => Habitat, (habitat) => habitat.id)
  habitat: Habitat;

  @JoinColumn()
  @OneToOne(() => AnimalImage, (animalImage) => animalImage.id)
  image: AnimalImage;

  @Column()
  imageId: number;
}
