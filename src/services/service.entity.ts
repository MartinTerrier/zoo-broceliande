import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceImage } from './serviceImage.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column()
  description: string;

  @JoinColumn()
  @OneToOne(() => ServiceImage)
  image: ServiceImage;

  @Column()
  imageId: number;
}
