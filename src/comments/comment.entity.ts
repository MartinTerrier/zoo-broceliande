import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  alias: string;

  @Column('text')
  content: string;

  @Column()
  isDisplayed: boolean;
}
