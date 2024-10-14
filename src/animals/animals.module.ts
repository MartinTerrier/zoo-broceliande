import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { Species } from './species.entity';
import { Meal } from './meal.entity';
import { VetReport } from './vetReport.entity';
import { AnimalImage } from './animalImage.entity';
import { HabitatsService } from '../habitats/habitats.service';
import { Habitat } from '../habitats/habitat.entity';
import { HabitatImage } from '../habitats/habitatImage.entity';
import { UsersRepository } from '../auth/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal,
      AnimalImage,
      Habitat,
      HabitatImage,
      Species,
      Meal,
      VetReport,
    ]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService, HabitatsService, UsersRepository],
})
export class AnimalsModule {}
