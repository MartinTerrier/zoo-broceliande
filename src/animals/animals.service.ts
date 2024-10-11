import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { Repository } from 'typeorm';
import { AnimalDto } from './dto/animal.dto';
import { Species } from './species.entity';
import { AnimalImage } from './animalImage.entity';
import { extname } from 'path';
import { HabitatsService } from '../habitats/habitats.service';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(AnimalImage)
    private animalImagesRepository: Repository<AnimalImage>,
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
    private readonly habitatsService: HabitatsService,
  ) {}

  async getAllAnimals() {
    return await this.animalsRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.species', 'species')
      .leftJoinAndSelect('animal.habitat', 'habitat')
      .getMany();
  }

  async getAnimalsByHabitat(habitatId: number) {
    return await this.animalsRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.species', 'species')
      .leftJoinAndSelect('animal.habitat', 'habitat')
      .where('habitat.id = :habitatId', { habitatId })
      .getMany();
  }

  async getAnimal(id: number) {
    return await this.animalsRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.species', 'species')
      .leftJoinAndSelect('animal.habitat', 'habitat')
      .where('animal.id = :id', { id })
      .getOne();
  }

  async getImage(id: number) {
    const image = await this.animalImagesRepository.findOneBy({ id });
    if (!image) {
      throw new NotFoundException(`No AnimalImage found with id ${id}.`);
    }
    return image;
  }

  async createAnimal(animalDto: AnimalDto, imageFile?: Express.Multer.File) {
    const newAnimal = this.animalsRepository.create(animalDto);
    newAnimal.status = 'En bonne santé';

    if (imageFile) {
      newAnimal.image = await this.uploadAnimalImage(
        imageFile.buffer,
        `${newAnimal.name}${extname(imageFile.originalname)}`,
      );
    }

    await this.animalsRepository.save(newAnimal);
    return newAnimal;
  }

  async updateAnimal(
    id: number,
    animalDto: AnimalDto,
    imageFile?: Express.Multer.File,
  ) {
    const animalToUpdate = await this.getAnimal(id);

    if (!animalToUpdate) {
      throw new NotFoundException(`No Animal found with id ${id}.`);
    }
    const priorImageId = animalToUpdate.imageId;

    if (imageFile) {
      animalToUpdate.image = await this.uploadAnimalImage(
        imageFile.buffer,
        `${animalToUpdate.name}${extname(imageFile.originalname)}`,
      );
    }

    animalToUpdate.name = animalDto.name;
    animalToUpdate.species = await this.speciesRepository.findOneBy({
      id: animalDto.speciesId,
    });
    animalToUpdate.habitat = await this.habitatsService.getHabitatById(
      animalDto.habitatId,
    );
    await this.animalsRepository.save(animalToUpdate);

    if (priorImageId && imageFile) {
      await this.animalImagesRepository.delete({ id: priorImageId });
    }

    return animalToUpdate;
  }

  async updateAnimalStatus(id: number, status: string) {
    await this.animalsRepository.update({ id }, { status });
    return this.animalsRepository.findOneBy({ id });
  }

  async deleteAnimal(id: number) {
    const animalToDelete = await this.animalsRepository.findOneBy({ id });
    if (!animalToDelete) {
      throw new NotFoundException(`No Animal found with id ${id}.`);
    }

    await this.animalsRepository.remove(animalToDelete);
    await this.animalImagesRepository.delete({ id: animalToDelete.imageId });
  }

  async createSpecies(label: string) {
    return this.speciesRepository.create({ label });
  }

  private async uploadAnimalImage(dataBuffer: Buffer, fileName: string) {
    const newImage = this.animalImagesRepository.create({
      fileName,
      imageFile: dataBuffer,
    });
    await this.animalImagesRepository.save(newImage);
    return newImage;
  }
}
