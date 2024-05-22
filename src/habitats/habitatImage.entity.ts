import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Habitat } from './habitat.entity';

@Entity()
export class HabitatImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Habitat, (habitat) => habitat.id)
  habitatId: number;

  @Column()
  imagePath: string;
}
