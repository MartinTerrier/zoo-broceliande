import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { ServiceDto } from '../dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(private servicesRepository: ServicesRepository) {}

  async getAllServices() {
    return await this.servicesRepository.find();
  }

  async createService(serviceDto: ServiceDto) {
    return await this.servicesRepository.createService(serviceDto);
  }
}
