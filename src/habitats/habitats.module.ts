import { Module } from '@nestjs/common';
import { HabitatsController } from './habitats.controller';
import { HabitatsService } from './habitats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitat } from './habitat.entity';
import { HabitatImage } from './habitatImage.entity';
import { HabitatsRepository } from './habitats.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habitat, HabitatImage])],
  controllers: [HabitatsController],
  providers: [HabitatsService, HabitatsRepository, AuthModule],
})
export class HabitatsModule {}
