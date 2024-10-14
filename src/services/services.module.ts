import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { ServiceImage } from './serviceImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceImage])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
