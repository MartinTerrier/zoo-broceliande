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
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/commentDto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/display')
  async getDisplayedComments() {
    return await this.commentsService.getComments(true);
  }

  @Get('/pending')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee)
  async getPendingComments() {
    return await this.commentsService.getComments(false);
  }

  @Post()
  async createComment(@Body() commentDto: CommentDto) {
    return await this.commentsService.createComment(commentDto);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee)
  async validateComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.displayComment(id);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Employee)
  async rejectComment(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.deleteComment(id);
  }
}
