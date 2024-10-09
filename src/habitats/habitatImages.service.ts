import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitatImage } from './habitatImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabitatImagesService {
  constructor(
    @InjectRepository(HabitatImage)
    private readonly habitatImageRepository: Repository<HabitatImage>,
  ) {}

  async getImageByHabitatId(habitatId: number) {
    const image = await this.habitatImageRepository.findOneBy({ habitatId });
    if (!image) {
      throw new NotFoundException(
        `No HabitatImage found for habitat with id ${habitatId}.`,
      );
    }
    return image;
  }

  async uploadHabitatImage(
    dataBuffer: Buffer,
    fileName: string,
    habitatId: number,
  ) {
    const newImage = this.habitatImageRepository.create({
      fileName,
      habitatId,
      imageFile: dataBuffer,
    });
    await this.habitatImageRepository.save(newImage);
    return newImage;
  }

  async deleteHabitatImage(habitatId: number) {
    await this.habitatImageRepository.delete({ habitatId });
  }
}
