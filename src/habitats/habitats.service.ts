import { Injectable } from '@nestjs/common';
import { HabitatsRepository } from './habitats.repository';
import { HabitatDto } from './dto/habitat.dto';

@Injectable()
export class HabitatsService {
  constructor(private habitatsRepository: HabitatsRepository) {}

  async getAllHabitats() {
    return await this.habitatsRepository.find();
  }

  async createHabitat(habitatDto: HabitatDto) {
    return await this.habitatsRepository.createHabitat(habitatDto);
  }

  async deleteHabitat(id: number) {
    return await this.habitatsRepository.deleteHabitat(id);
  }

  async updateHabitat(id: number, habitatDto: HabitatDto) {
    return await this.habitatsRepository.updateHabitat(id, habitatDto);
  }

  async commentHabitat(id: number, comment: string) {
    return await this.habitatsRepository.commentHabitat(id, comment);
  }
}
