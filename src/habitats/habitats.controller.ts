import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { HabitatDto } from './dto/habitat.dto';

@Controller('habitats')
export class HabitatsController {
  constructor(private habitatsService: HabitatsService) {}

  @Get()
  async getHabitats() {
    return await this.habitatsService.getAllHabitats();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createHabitat(@Body() habitatDto: HabitatDto) {
    return await this.habitatsService.createHabitat(habitatDto);
  }

  @Patch('/update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async updateHabitat(
    @Param('id', ParseIntPipe) id: number,
    @Body() habitatDto: HabitatDto,
  ) {
    return await this.habitatsService.updateHabitat(id, habitatDto);
  }

  @Patch('/comment/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Vet)
  async commentHabitat(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return await this.habitatsService.commentHabitat(id, body.comment);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteHabitat(@Param('id', ParseIntPipe) id: number) {
    return await this.habitatsService.deleteHabitat(id);
  }
}
