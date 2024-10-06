import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesRepository } from './services.repository';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { ServiceImagesService } from './serviceImages.service';
import { ServiceImage } from './serviceImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceImage])],
  controllers: [ServicesController],
  providers: [ServicesService, ServiceImagesService, ServicesRepository],
})
export class ServicesModule {}
