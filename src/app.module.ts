import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import 'dotenv/config';

@Module({
  imports: [
    ServicesModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      // url: 'postgres://postgres:projetbroceliande@localhost:5432/zoo-broceliande',
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'projetbroceliande',
      // database: 'zoo-broceliande',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
