import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { Repository } from 'typeorm';
import { AnimalDto } from './dto/animal.dto';
import { Species } from './species.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async getAllAnimals() {
    return await this.animalRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.speciesId', 'species')
      .getMany();
  }

  async getAnimalsByHabitat(habitatId: number) {
    return await this.animalRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.speciesId', 'species')
      .where('animal.habitatId = :habitatId', { habitatId })
      .getMany();
  }

  async createAnimal(animalDto: AnimalDto) {
    return this.animalRepository.create(animalDto);
  }

  async updateAnimal(id: number, animalDto: AnimalDto) {
    const { name, speciesId, habitatId } = animalDto;
    const animalToUpdate = await this.animalRepository.findOneBy({ id });

    if (!animalToUpdate) {
      throw new NotFoundException(`No Animal found with id ${id}.`);
    }

    animalToUpdate.name = name;
    animalToUpdate.speciesId = speciesId;
    animalToUpdate.habitatId = habitatId;
    await this.animalRepository.save(animalToUpdate);
    return animalToUpdate;
  }

  async updateAnimalStatus(id: number, status: string) {
    await this.animalRepository.update({ id }, { status });
    return this.animalRepository.findOneBy({ id });
  }

  async deleteAnimal(id: number) {
    await this.animalRepository.delete({ id });
  }

  async createSpecies(label: string) {
    return this.speciesRepository.create({ label });
  }
}
