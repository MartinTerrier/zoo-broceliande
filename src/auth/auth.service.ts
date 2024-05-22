import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDataDto } from './dto/userData.dto';
import { SignInDto } from './dto/signInDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(userDataDto: UserDataDto) {
    return await this.usersRepository.createUser(userDataDto);
  }

  async signIn(signInDto: SignInDto) {
    const { userName, password } = signInDto;

    const user = await this.usersRepository.findOneBy({ userName });

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Please check your login credentials.');
    }

    const payload = { userName, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
