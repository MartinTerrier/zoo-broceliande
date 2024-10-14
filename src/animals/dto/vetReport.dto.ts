import { IsDateString, IsEmail, IsInt } from 'class-validator';

export class VetReportDto {
  @IsInt()
  animalId: number;

  @IsEmail()
  userName: string;

  status: string;

  content: string;

  food: string;

  quantity: string;

  @IsDateString()
  date: Date;
}
