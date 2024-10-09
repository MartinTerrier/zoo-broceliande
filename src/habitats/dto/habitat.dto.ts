import { IsNotEmpty } from 'class-validator';

export class HabitatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  comment?: string;
}
