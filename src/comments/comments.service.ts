import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentDto } from './dto/commentDto';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async getComments(displayStatus: boolean) {
    return await this.commentsRepository.findBy({ isDisplayed: displayStatus });
  }

  async createComment(commentDto: CommentDto) {
    return await this.commentsRepository.createComment(commentDto);
  }

  async displayComment(id: number) {
    const commentToDisplay = await this.commentsRepository.findOneBy({ id });

    if (!commentToDisplay) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }

    commentToDisplay.isDisplayed = true;
    await this.commentsRepository.save(commentToDisplay);
    return commentToDisplay;
  }

  async deleteComment(id: number) {
    await this.commentsRepository.delete(id);
  }
}
