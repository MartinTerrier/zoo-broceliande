import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from './animal.entity';

@Entity()
export class AnimalImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column({ type: 'bytea' })
  imageFile: Uint8Array;

  @OneToOne(() => Animal, (animal) => animal.id)
  animal: Animal;

  @Column()
  animalId: number;
}
