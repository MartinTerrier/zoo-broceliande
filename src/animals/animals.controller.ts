import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnimalDto } from './dto/animal.dto';
import { Response } from 'express';
import { Readable } from 'stream';
import { MealDto } from './dto/meal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Get()
  async getAllAnimals() {
    return await this.animalsService.getAllAnimals();
  }

  @Get('/habitat/:id')
  async getAnimalsByHabitat(@Param('id', ParseIntPipe) habitatId: number) {
    return await this.animalsService.getAnimalsByHabitat(habitatId);
  }

  @Get('/species')
  async getAllSpecies() {
    return await this.animalsService.getAllSpecies();
  }

  @Get('/:id')
  async getAnimal(@Param('id', ParseIntPipe) id: number) {
    return await this.animalsService.getAnimal(id);
  }

  @Get('/meal/:id')
  async getMealsForAnimal(@Param('id', ParseIntPipe) animalId: number) {
    return await this.animalsService.getMealsForAnimal(animalId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async createAnimal(
    @Body() animalDto: AnimalDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (imageFile) {
      return await this.animalsService.createAnimal(animalDto, imageFile);
    } else {
      return await this.animalsService.createAnimal(animalDto);
    }
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async updateAnimal(
    @Param('id', ParseIntPipe) id: number,
    @Body() animalDto: AnimalDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    if (imageFile) {
      return await this.animalsService.updateAnimal(id, animalDto, imageFile);
    } else {
      return await this.animalsService.updateAnimal(id, animalDto);
    }
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteAnimal(@Param('id', ParseIntPipe) id: number) {
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

  @Post('/meal')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee)
  async createMeal(@Body() mealDto: MealDto) {
    return await this.animalsService.createMeal(mealDto);
  }

  @Get('/image/:id')
  async getImage(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const image = await this.animalsService.getImage(id);

    if (!image) return;

    const stream = Readable.from(image.imageFile);

    response.set({
      'Content-Disposition': `inline; filename = "${image.fileName}"`,
      'Content-Type': image,
    });

    return new StreamableFile(stream);
  }
}
