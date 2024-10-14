import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(private datasource: DataSource) {
    super(Comment, datasource.createEntityManager());
  }

  async createComment(commentDto: CommentDto) {
    const { alias, content } = commentDto;
    const newComment = this.create({
      alias,
      content,
      isDisplayed: false,
    });

    await this.save(newComment);
    return newComment;
  }
}
