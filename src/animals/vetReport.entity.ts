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

  @Column('text')
  content: string;

  @Column('varchar', { length: 50 })
  food: string;

  @Column('varchar', { length: 50 })
  quantity: string;

  @ManyToOne(() => Animal, (animal) => animal.id, { onDelete: 'CASCADE' })
  animal: Animal;

  @ManyToOne(() => User, (user) => user.userName)
  vet: User;
}
