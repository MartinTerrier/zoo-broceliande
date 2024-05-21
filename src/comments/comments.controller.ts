import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/commentDto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() commentDto: CommentDto) {
    return await this.commentsService.createComment(commentDto);
  }
}
