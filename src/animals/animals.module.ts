import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { Species } from './species.entity';
import { Meal } from './meal.entity';
import { VetReport } from './vetReport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Species, Meal, VetReport])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
