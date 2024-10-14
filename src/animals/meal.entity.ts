import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from './animal.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  food: string;

  @Column('varchar', { length: 50 })
  quantity: string;

  @ManyToOne(() => Animal, (animal) => animal.meal, { onDelete: 'CASCADE' })
  animal: Animal;

  @ManyToOne(() => User, (user) => user.userName)
  employee: User;

  @Column()
  date: Date;
}
