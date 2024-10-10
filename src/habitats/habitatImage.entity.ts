import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HabitatImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column({ type: 'bytea' })
  imageFile: Uint8Array;
}
