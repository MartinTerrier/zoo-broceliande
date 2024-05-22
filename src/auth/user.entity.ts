import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryColumn()
  @IsEmail()
  userName: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  role: Role;
}
