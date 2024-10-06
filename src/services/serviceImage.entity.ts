import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class ServiceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'serviceId' })
  @OneToOne(() => Service, (service) => service.id)
  service: Service;

  @Column()
  serviceId: number;

  @Column()
  fileName: string;

  @Column({ type: 'bytea' })
  imageFile: Uint8Array;
}
