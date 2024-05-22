import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async getALlServices() {
    return await this.servicesService.getAllServices();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createService(@Body() serviceDto: ServiceDto) {
    return await this.servicesService.createService(serviceDto);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee)
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() serviceDto: ServiceDto,
  ) {
    return await this.servicesService.updateService(id, serviceDto);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.deleteService(id);
  }
}
