import { IsDateString, IsEmail, IsInt } from 'class-validator';

export class MealDto {
  @IsInt()
  animalId: number;

  @IsEmail()
  userName: string;

  food: string;

  quantity: string;

  @IsDateString()
  date: Date;
}
