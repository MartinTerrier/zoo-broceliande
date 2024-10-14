import { Role } from '../role.enum';
import { IsEmail, IsEnum } from 'class-validator';

export class UserDataDto {
  @IsEmail()
  userName: string;
  name: string;
  firstName: string;
  @IsEnum(Role)
  role: Role;
  password: string;
}
