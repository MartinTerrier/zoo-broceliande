import { Controller, Get, Post } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async getALlServices() {
    await this.servicesService.getAllServices();
  }

  @Post()
  createService(name: string, description: string) {}
}
