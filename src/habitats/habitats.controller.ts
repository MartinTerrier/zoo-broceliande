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
import { HabitatsService } from './habitats.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { HabitatDto } from './dto/habitat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HabitatImagesService } from './habitatImages.service';
import { extname } from 'path';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('habitats')
export class HabitatsController {
  constructor(
    private habitatsService: HabitatsService,
    private habitatImagesService: HabitatImagesService,
  ) {}

  @Get()
  async getHabitats() {
    return await this.habitatsService.getAllHabitats();
  }

  @Get('/:id')
  async getHabitatById(@Param('id', ParseIntPipe) id: number) {
    return await this.habitatsService.getHabitatById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async createHabitat(
    @Body() habitatDto: HabitatDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    const newHabitat = await this.habitatsService.createHabitat(habitatDto);
    if (imageFile) {
      await this.habitatImagesService.uploadHabitatImage(
        imageFile.buffer,
        `habitat${newHabitat.id}${extname(imageFile.originalname)}`,
        newHabitat.id,
      );
    }
    return newHabitat;
  }

  @Patch('/update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('imageFile'))
  async updateHabitat(
    @Param('id', ParseIntPipe) id: number,
    @Body() habitatDto: HabitatDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    const updatedHabitat = await this.habitatsService.updateHabitat(
      id,
      habitatDto,
    );
    if (imageFile) {
      await this.habitatImagesService.deleteHabitatImage(id);
      await this.habitatImagesService.uploadHabitatImage(
        imageFile.buffer,
        `habitat${updatedHabitat.id}${extname(imageFile.originalname)}`,
        id,
      );
    }
    return updatedHabitat;
  }

  @Patch('/comment/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Vet)
  async commentHabitat(
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: string,
  ) {
    return await this.habitatsService.commentHabitat(id, comment);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteHabitat(@Param('id', ParseIntPipe) id: number) {
    await this.habitatImagesService.deleteHabitatImage(id);
    await this.habitatsService.deleteHabitat(id);
  }

  @Get('/image/:id')
  async getImageByHabitatId(
    @Param('id', ParseIntPipe) habitatId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const image =
      await this.habitatImagesService.getImageByHabitatId(habitatId);
    if (!image) return;

    const stream = Readable.from(image.imageFile);

    response.set({
      'Content-disposition': `inline; filename = "${image.fileName}"`,
      'Content-Type': image,
    });

    return new StreamableFile(stream);
  }
}
