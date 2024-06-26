import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alias: string;

  @Column()
  content: string;

  @Column()
  isDisplayed: boolean;
}
