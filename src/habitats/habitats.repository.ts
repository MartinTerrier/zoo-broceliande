import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Habitat } from './habitat.entity';
import { HabitatDto } from './dto/habitat.dto';

@Injectable()
export class HabitatsRepository extends Repository<Habitat> {
  constructor(private datasource: DataSource) {
    super(Habitat, datasource.createEntityManager());
  }

  async createHabitat(habitatDto: HabitatDto) {
    const { name, description } = habitatDto;

    const newHabitat = this.create({
      name,
      description,
    });

    await this.save(newHabitat);
    return newHabitat;
  }

  async deleteHabitat(id: number) {
    const result = await this.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Habitat with id ${id} not found.`);
    }
  }

  async updateHabitat(id: number, habitatDto: HabitatDto) {
    const { name, description } = habitatDto;
    const habitatToUpdate = await this.findOneBy({ id });

    if (!habitatToUpdate) {
      throw new NotFoundException(`Habitat with id ${id} not found.`);
    }

    habitatToUpdate.name = name;
    habitatToUpdate.description = description;
    await this.save(habitatToUpdate);
    return habitatToUpdate;
  }

  async commentHabitat(id: number, comment: string) {
    const habitatToUpdate = await this.findOneBy({ id });

    if (!habitatToUpdate) {
      throw new NotFoundException(`Habitat with id ${id} not found.`);
    }

    habitatToUpdate.comment = comment;
    await this.save(habitatToUpdate);
    return habitatToUpdate;
  }
}
