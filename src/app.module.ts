import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ServicesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'projetbroceliande',
      database: 'zoo-broceliande',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
