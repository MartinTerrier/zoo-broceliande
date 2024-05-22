import { IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail()
  userName: string;

  password: string;
}
