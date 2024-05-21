import { DataSource, Repository } from 'typeorm';
import { Service } from './service.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesRepository extends Repository<Service> {
  constructor(private datasource: DataSource) {
    super(Service, datasource.createEntityManager());
  }
}
