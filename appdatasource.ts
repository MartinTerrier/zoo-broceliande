import { DataSource } from 'typeorm';
import { User } from './src/auth/user.entity';
import { Habitat } from './src/habitats/habitat.entity';
import { Animal } from './src/animals/animal.entity';
import { VetReport } from './src/animals/vetReport.entity';
import { Service } from './src/services/service.entity';
import { Meal } from './src/animals/meal.entity';
import { Species } from './src/animals/species.entity';
import { Comment } from './src/comments/comment.entity';
import * as process from 'node:process';
import 'dotenv/config';

export const appDataSource: DataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [User, Habitat, Animal, VetReport, Service, Meal, Species, Comment],
});
