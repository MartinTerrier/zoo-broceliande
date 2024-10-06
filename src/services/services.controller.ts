import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { ServiceImagesService } from './serviceImages.service';
import { extname } from 'path';
import { Service } from './service.entity';
import { Readable } from 'stream';

@Controller('services')
export class ServicesController {
  constructor(
    private servicesService: ServicesService,
    private serviceImagesService: ServiceImagesService,
  ) {}

  @Get()
  async getAllServices(): Promise<Service[]> {
    return await this.servicesService.getAllServices();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async createService(
    @Body() serviceDto: ServiceDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Service> {
    const createdService = await this.servicesService.createService(serviceDto);
    if (imageFile) {
      await this.serviceImagesService.uploadServiceImage(
        imageFile.buffer,
        `service${createdService.id}${extname(imageFile.originalname)}`,
        createdService.id,
      );
    }
    return createdService;
  }

  @Post('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee, Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() serviceDto: ServiceDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Service> {
    const updatedService = await this.servicesService.updateService(
      id,
      serviceDto,
    );
    if (imageFile) {
      await this.serviceImagesService.deleteServiceImage(id);
      await this.serviceImagesService.uploadServiceImage(
        imageFile.buffer,
        `service${id}${extname(imageFile.originalname)}`,
        id,
      );
    }
    return updatedService;
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteService(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.serviceImagesService.deleteServiceImage(id);
    await this.servicesService.deleteService(id);
  }

  @Get('/image/:id')
  async getImageByServiceId(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const image = await this.serviceImagesService.getImageByServiceId(id);

    if (!image) {
      return;
    }

    const stream = Readable.from(image.imageFile);

    response.set({
      'Content-Disposition': `inline; filename = "${image.fileName}"`,
      'Content-Type': image,
    });

    return new StreamableFile(stream);
  }
}
