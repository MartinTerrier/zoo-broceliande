import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HabitatImage } from './habitatImage.entity';

@Entity()
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('text')
  description: string;

  @JoinColumn()
  @OneToOne(() => HabitatImage, (habitatImage) => habitatImage.id)
  image: HabitatImage;

  @Column()
  imageId: number;
}
