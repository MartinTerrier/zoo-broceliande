import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceImage } from './serviceImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceImagesService {
  constructor(
    @InjectRepository(ServiceImage)
    private serviceImageRepository: Repository<ServiceImage>,
  ) {}

  async getImageByServiceId(serviceId: number) {
    const image = this.serviceImageRepository.findOneBy({ serviceId });
    if (!image) {
      throw new NotFoundException(
        `No serviceImage found for service with id ${serviceId}.`,
      );
    }
    return image;
  }

  async uploadServiceImage(
    dataBuffer: Buffer,
    fileName: string,
    serviceId: number,
  ) {
    const newImage = this.serviceImageRepository.create({
      fileName,
      serviceId,
      imageFile: dataBuffer,
    });
    await this.serviceImageRepository.save(newImage);
    return newImage;
  }

  async deleteServiceImage(serviceId: number) {
    await this.serviceImageRepository.delete({ serviceId });
  }
}
