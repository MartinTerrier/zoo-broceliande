import { Injectable, NotFoundException } from '@nestjs/common';
import { HabitatDto } from './dto/habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitatImage } from './habitatImage.entity';
import { Repository } from 'typeorm';
import { Habitat } from './habitat.entity';
import { extname } from 'path';

@Injectable()
export class HabitatsService {
  constructor(
    @InjectRepository(Habitat)
    private habitatsRepository: Repository<Habitat>,
    @InjectRepository(HabitatImage)
    private habitatImagesRepository: Repository<HabitatImage>,
  ) {}

  async getAllHabitats() {
    return await this.habitatsRepository.find();
  }

  async getHabitatById(id: number) {
    return await this.habitatsRepository.findOneBy({ id });
  }

  async getImage(id: number) {
    const image = await this.habitatImagesRepository.findOneBy({ id });
    if (!image) {
      throw new NotFoundException(`No habitatImage found with id ${id}.`);
    }
    return image;
  }

  async createHabitat(habitatDto: HabitatDto, imageFile?: Express.Multer.File) {
    const newHabitat = this.habitatsRepository.create(habitatDto);

    if (imageFile) {
      newHabitat.image = await this.uploadHabitatImage(
        imageFile.buffer,
        `${newHabitat.name}${extname(imageFile.originalname)}`,
      );
    }
    await this.habitatsRepository.save(newHabitat);
    return newHabitat;
  }

  async deleteHabitat(id: number) {
    const habitatToDelete = await this.habitatsRepository.findOneBy({ id });
    if (!habitatToDelete) {
      throw new NotFoundException(`No Habitat found with id ${id}.`);
    }
    await this.habitatsRepository.remove(habitatToDelete);
    await this.habitatImagesRepository.delete({ id: habitatToDelete.imageId });
  }

  async updateHabitat(
    id: number,
    habitatDto: HabitatDto,
    imageFile?: Express.Multer.File,
  ) {
    const habitatToUpdate = await this.habitatsRepository.findOneBy({ id });
    if (!habitatToUpdate) {
      throw new NotFoundException(`No Habitat found with id ${id}.`);
    }
    const priorImageId = habitatToUpdate.imageId;

    if (imageFile) {
      habitatToUpdate.image = await this.uploadHabitatImage(
        imageFile.buffer,
        `${habitatDto.name}${extname(imageFile.originalname)}`,
      );
    }

    habitatToUpdate.name = habitatDto.name;
    habitatToUpdate.description = habitatDto.description;
    const updatedHabitat = await this.habitatsRepository.save(habitatToUpdate);

    if (priorImageId && imageFile) {
      await this.habitatImagesRepository.delete({ id: priorImageId });
    }

    return updatedHabitat;
  }

  async commentHabitat(id: number, comment: string) {
    const habitatToUpdate = await this.habitatsRepository.findOneBy({ id });

    if (!habitatToUpdate) {
      throw new NotFoundException(`Habitat with id ${id} not found.`);
    }

    habitatToUpdate.comment = comment;
    await this.habitatsRepository.save(habitatToUpdate);
    return habitatToUpdate;
  }

  private async uploadHabitatImage(dataBuffer: Buffer, fileName: string) {
    const newImage = this.habitatImagesRepository.create({
      fileName,
      imageFile: dataBuffer,
    });
    await this.habitatImagesRepository.save(newImage);
    return newImage;
  }
}
