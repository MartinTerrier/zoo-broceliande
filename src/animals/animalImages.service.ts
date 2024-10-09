import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalImage } from './animalImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalImagesService {
  constructor(
    @InjectRepository(AnimalImage)
    private readonly animalImageRepository: Repository<AnimalImage>,
  ) {}

  async getImageByAnimalId(animalId: number) {
    const image = await this.animalImageRepository.findOneBy({ animalId });
    if (!image) {
      throw new NotFoundException(
        `No AnimalImage found for animal with Id ${animalId}.`,
      );
    }
    return image;
  }

  async uploadAnimalImage(
    dataBuffer: Buffer,
    fileName: string,
    animalId: number,
  ) {
    const newImage = this.animalImageRepository.create({
      fileName,
      animalId,
      imageFile: dataBuffer,
    });
    await this.animalImageRepository.save(newImage);
    return newImage;
  }

  async deleteAnimalImage(animalId: number) {
    await this.animalImageRepository.delete({ animalId });
  }
}
