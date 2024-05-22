import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/userCredentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(userCredentialsDto: UserCredentialsDto) {
    return await this.usersRepository.createUser(userCredentialsDto);
  }
}
