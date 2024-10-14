import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 50 })
  @IsEmail()
  userName: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 10 })
  role: Role;
}
