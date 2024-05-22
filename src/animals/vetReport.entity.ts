import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Animal } from './animal.entity';
import { User } from '../auth/user.entity';

@Entity()
export class VetReport {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  content: string;

  @ManyToOne(() => Animal, (animal) => animal.id)
  animalId: number;

  @ManyToOne(() => User, (user) => user.userName)
  vet: string;
}
