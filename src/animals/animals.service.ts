import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { Repository } from 'typeorm';
import { AnimalDto } from './dto/animal.dto';
import { Species } from './species.entity';
import { AnimalImage } from './animalImage.entity';
import { extname } from 'path';
import { HabitatsService } from '../habitats/habitats.service';
import { Meal } from './meal.entity';
import { MealDto } from './dto/meal.dto';
import { UsersRepository } from '../auth/users.repository';
import { VetReport } from './vetReport.entity';
import { VetReportDto } from './dto/vetReport.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(AnimalImage)
    private animalImagesRepository: Repository<AnimalImage>,
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    @InjectRepository(VetReport)
    private vetReportsRepository: Repository<VetReport>,
    private readonly usersRepository: UsersRepository,
    private readonly habitatsService: HabitatsService,
  ) {}

  async getAllAnimals() {
    return await this.animalsRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.species', 'species')
      .leftJoinAndSelect('animal.habitat', 'habitat')
      .orderBy('habitat.id')
      .addOrderBy('species.id')
      .getMany();
  }

  async getAnimalsByHabitat(habitatId: number) {
    return await this.animalsRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.species', 'species')
      .leftJoinAndSelect('animal.habitat', 'habitat')
      .orderBy('species.id')
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

  async getAllSpecies() {
    return await this.speciesRepository.find();
  }

  async getMealsForAnimal(id: number) {
    return await this.mealsRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.employee', 'employee')
      .leftJoinAndSelect('meal.animal', 'animal')
      .orderBy('meal.date')
      .where('animal.id = :id', { id })
      .getMany();
  }

  async createAnimal(animalDto: AnimalDto, imageFile?: Express.Multer.File) {
    const { name, speciesId, habitatId } = animalDto;
    const species = await this.speciesRepository.findOneBy({ id: speciesId });
    const habitat = await this.habitatsService.getHabitatById(habitatId);
    const newAnimal = this.animalsRepository.create({
      name,
      species,
      habitat,
    });
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
    const species = this.speciesRepository.findOneBy({ label });
    if (species) return new Error(`L'espèce ${label} existe déjà.`);

    const newSpecies = this.speciesRepository.create({ label });
    await this.speciesRepository.save(newSpecies);
    return newSpecies;
  }

  async createMeal(mealDto: MealDto) {
    const { animalId, userName, food, quantity, date } = mealDto;
    const employee = await this.usersRepository.getUser(userName);
    const animal = await this.getAnimal(animalId);

    const newMeal = this.mealsRepository.create({
      employee,
      animal,
      food,
      quantity,
      date,
    });

    await this.mealsRepository.save(newMeal);
    return newMeal;
  }

  async createVetReport(vetReportDto: VetReportDto) {
    const { animalId, userName, status, content, food, quantity, date } =
      vetReportDto;
    const vet = await this.usersRepository.getUser(userName);
    const animal = await this.getAnimal(animalId);
    animal.status = status;
    await this.animalsRepository.save(animal);

    const newReport = this.vetReportsRepository.create({
      vet,
      animal,
      content,
      food,
      quantity,
      date,
    });

    await this.vetReportsRepository.save(newReport);
    return newReport;
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
