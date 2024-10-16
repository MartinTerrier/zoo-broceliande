import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceDto } from './dto/service.dto';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceImage } from './serviceImage.entity';
import { extname } from 'path';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,

    @InjectRepository(ServiceImage)
    private serviceImagesRepository: Repository<ServiceImage>,
  ) {}

  async getAllServices(): Promise<Service[]> {
    return await this.servicesRepository
      .createQueryBuilder('service')
      .orderBy('service.id')
      .getMany();
  }

  async getImage(id: number) {
    const image = await this.serviceImagesRepository.findOneBy({ id });
    if (!image) {
      throw new NotFoundException(`No serviceImage found with id ${id}.`);
    }
    return image;
  }

  async createService(
    serviceDto: ServiceDto,
    imageFile?: Express.Multer.File,
  ): Promise<Service> {
    const newService = this.servicesRepository.create(serviceDto);
    if (imageFile) {
      newService.image = await this.uploadServiceImage(
        imageFile.buffer,
        `${newService.name}${extname(imageFile.originalname)}`,
      );
    }
    await this.servicesRepository.save(newService);
    return newService;
  }

  async deleteService(id: number): Promise<void> {
    const serviceToDelete = await this.servicesRepository.findOneBy({ id });
    if (!serviceToDelete) {
      throw new NotFoundException(`Service with id ${id} not found.`);
    }
    await this.servicesRepository.remove(serviceToDelete);
    await this.serviceImagesRepository.delete({ id: serviceToDelete.imageId });
  }

  async updateService(
    id: number,
    serviceDto: ServiceDto,
    imageFile?: Express.Multer.File,
  ): Promise<Service> {
    const serviceToUpdate = await this.servicesRepository.findOneBy({ id });
    if (!serviceToUpdate) {
      throw new NotFoundException(`Service with id ${id} not found.`);
    }
    const priorImageId = serviceToUpdate.imageId;

    if (imageFile) {
      serviceToUpdate.image = await this.uploadServiceImage(
        imageFile.buffer,
        `${serviceDto.name}${extname(imageFile.originalname)}`,
      );
    }

    serviceToUpdate.name = serviceDto.name;
    serviceToUpdate.description = serviceDto.description;
    const updatedService = await this.servicesRepository.save(serviceToUpdate);

    if (priorImageId && imageFile) {
      await this.serviceImagesRepository.delete({ id: priorImageId });
    }
    return updatedService;
  }

  private async uploadServiceImage(dataBuffer: Buffer, fileName: string) {
    const newImage = this.serviceImagesRepository.create({
      fileName,
      imageFile: dataBuffer,
    });
    await this.serviceImagesRepository.save(newImage);
    return newImage;
  }
}
