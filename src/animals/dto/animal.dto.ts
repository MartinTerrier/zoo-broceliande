import { IsNotEmpty } from 'class-validator';

export class AnimalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  speciesId: number;

  @IsNotEmpty()
  habitatId: number;
}
