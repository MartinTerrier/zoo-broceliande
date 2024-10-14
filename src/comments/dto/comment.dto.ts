import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  alias: string;

  @IsNotEmpty()
  content: string;
}
