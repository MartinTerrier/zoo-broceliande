import { IsNotEmpty } from 'class-validator';

export class ServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
  //
  // imageFile: Uint8Array;
}
