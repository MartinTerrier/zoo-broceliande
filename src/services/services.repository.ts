import { DataSource, Repository } from 'typeorm';
import { Service } from './service.entity';
import { Injectable } from '@nestjs/common';
import { ServiceDto } from '../dto/service.dto';

@Injectable()
export class ServicesRepository extends Repository<Service> {
  constructor(private datasource: DataSource) {
    super(Service, datasource.createEntityManager());
  }

  async createService(serviceDto: ServiceDto) {
    const { name, description } = serviceDto;

    const newService = this.create({
      name,
      description,
    });
    await this.save(newService);
    return newService;
  }
}
