import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { ServiceDto } from './dto/service.dto';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(private servicesRepository: ServicesRepository) {}

  async getAllServices(): Promise<Service[]> {
    return await this.servicesRepository.find();
  }

  async createService(serviceDto: ServiceDto): Promise<Service> {
    return await this.servicesRepository.createService(serviceDto);
  }

  async deleteService(id: number): Promise<void> {
    return await this.servicesRepository.deleteService(id);
  }

  async updateService(id: number, serviceDto: ServiceDto): Promise<Service> {
    return await this.servicesRepository.updateService(id, serviceDto);
  }
}
