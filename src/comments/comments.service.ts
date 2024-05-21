import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentDto } from './dto/commentDto';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async createComment(commentDto: CommentDto) {
    return await this.commentsRepository.createComment(commentDto);
  }
}
