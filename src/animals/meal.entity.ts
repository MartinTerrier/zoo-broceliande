import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from './animal.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  food: string;

  @Column()
  quantity: string;

  @ManyToOne(() => Animal, (animal) => animal.id)
  animalId: number;

  @ManyToOne(() => User, (user) => user.userName)
  employee: string;
}
