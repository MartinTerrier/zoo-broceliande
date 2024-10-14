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
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('habitats')
export class HabitatsController {
  constructor(private habitatsService: HabitatsService) {}

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
    if (imageFile) {
      return await this.habitatsService.createHabitat(habitatDto, imageFile);
    } else {
      return await this.habitatsService.createHabitat(habitatDto);
    }
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
    if (imageFile) {
      return await this.habitatsService.updateHabitat(
        id,
        habitatDto,
        imageFile,
      );
    } else {
      return await this.habitatsService.updateHabitat(id, habitatDto);
    }
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteHabitat(@Param('id', ParseIntPipe) id: number) {
    await this.habitatsService.deleteHabitat(id);
  }

  @Get('/image/:id')
  async getImage(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const image = await this.habitatsService.getImage(id);
    if (!image) return;

    const stream = Readable.from(image.imageFile);

    response.set({
      'Content-disposition': `inline; filename = "${image.fileName}"`,
      'Content-Type': image,
    });

    return new StreamableFile(stream);
  }
}
