import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async getALlServices() {
    return await this.servicesService.getAllServices();
  }

  @Post()
  async createService(@Body() serviceDto: ServiceDto) {
    return await this.servicesService.createService(serviceDto);
  }

  @Patch('/:id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() serviceDto: ServiceDto,
  ) {
    return await this.servicesService.updateService(id, serviceDto);
  }

  @Delete('/:id')
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.deleteService(id);
  }
}
