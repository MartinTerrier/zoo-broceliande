import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  comment: string;
}
