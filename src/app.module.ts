import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { AnimalsModule } from './animals/animals.module';
import { HabitatsModule } from './habitats/habitats.module';
import * as process from 'node:process';
import 'dotenv/config';

@Module({
  imports: [
    ServicesModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      // ssl: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommentsModule,
    AuthModule,
    AnimalsModule,
    HabitatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
