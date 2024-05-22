import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/commentDto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/:status')
  async getCommentsByStatus(@Param('status', ParseBoolPipe) status: boolean) {
    return await this.commentsService.getComments(status);
  }

  @Post()
  async createComment(@Body() commentDto: CommentDto) {
    return await this.commentsService.createComment(commentDto);
  }

  @Patch('/:id')
  async validateComment(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.displayComment(id);
  }

  @Delete('/:id')
  async rejectComment(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.deleteComment(id);
  }
}
