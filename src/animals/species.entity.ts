import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  label: string;
}
