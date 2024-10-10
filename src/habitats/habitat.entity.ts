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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  comment: string;

  @JoinColumn()
  @OneToOne(() => HabitatImage, (habitatImage) => habitatImage.id)
  image: HabitatImage;

  @Column()
  imageId: number;
}
