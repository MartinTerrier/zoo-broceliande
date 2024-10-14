import { Module } from '@nestjs/common';
import { HabitatsController } from './habitats.controller';
import { HabitatsService } from './habitats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitat } from './habitat.entity';
import { HabitatImage } from './habitatImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitat, HabitatImage])],
  controllers: [HabitatsController],
  providers: [HabitatsService],
})
export class HabitatsModule {}
