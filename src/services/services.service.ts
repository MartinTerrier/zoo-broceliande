import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';

@Injectable()
export class ServicesService {
  constructor(private servicesRepository: ServicesRepository) {}

  async getAllServices() {
    return await this.servicesRepository.find();
  }
}
