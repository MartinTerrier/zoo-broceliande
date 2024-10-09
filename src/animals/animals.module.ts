import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { Species } from './species.entity';
import { Meal } from './meal.entity';
import { VetReport } from './vetReport.entity';
import { AnimalImagesService } from './animalImages.service';
import { AnimalImage } from './animalImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal, AnimalImage, Species, Meal, VetReport]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalImagesService],
})
export class AnimalsModule {}
