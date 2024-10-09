import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Habitat } from './habitat.entity';

@Entity()
export class HabitatImage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Habitat, (habitat) => habitat.id)
  habitat: Habitat;

  @Column()
  habitatId: number;

  @Column()
  fileName: string;

  @Column({ type: 'bytea' })
  imageFile: Uint8Array;
}
