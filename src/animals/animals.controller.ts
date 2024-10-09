import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalImagesService } from './animalImages.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnimalDto } from './dto/animal.dto';
import { extname } from 'path';

@Controller('animals')
export class AnimalsController {
  constructor(
    private animalsService: AnimalsService,
    private animalImagesService: AnimalImagesService,
  ) {}

  @Get()
  async getAllAnimals() {
    return await this.animalsService.getAllAnimals();
  }

  @Get('/habitat/:id')
  async getAnimalsByHabitat(@Param('id', ParseIntPipe) habitatId: number) {
    return await this.animalsService.getAnimalsByHabitat(habitatId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async createAnimal(
    @Body() animalDto: AnimalDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    const newAnimal = await this.animalsService.createAnimal(animalDto);
    if (imageFile) {
      await this.animalImagesService.uploadAnimalImage(
        imageFile.buffer,
        `animal${newAnimal.id}${extname(imageFile.originalname)}`,
        newAnimal.id,
      );
    }
    return newAnimal;
  }

  @Post('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async updateAnimal(
    @Param('id', ParseIntPipe) id: number,
    @Body() animalDto: AnimalDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    const updatedAnimal = await this.animalsService.updateAnimal(id, animalDto);
    if (imageFile) {
      await this.animalImagesService.deleteAnimalImage(id);
      await this.animalImagesService.uploadAnimalImage(
        imageFile.buffer,
        `animal${updatedAnimal.id}${extname(imageFile.originalname)}`,
        updatedAnimal.id,
      );
    }
    return updatedAnimal;
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteAnimal(@Param('id', ParseIntPipe) id: number) {
    await this.animalImagesService.deleteAnimalImage(id);
    await this.animalsService.deleteAnimal(id);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Vet)
  async updateAnimalStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() status: string,
  ) {
    return await this.animalsService.updateAnimalStatus(id, status);
  }

  @Post('/species')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createSpecies(@Body() label: string) {
    return await this.animalsService.createSpecies(label);
  }
}
