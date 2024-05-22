import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDataDto } from './dto/userData.dto';
import { SignInDto } from './dto/signInDto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create')
  async createUser(@Body() userDataDto: UserDataDto) {
    return await this.authService.createUser(userDataDto);
  }

  @Post('/login')
  async signIn(@Body() signInDto: SignInDto) {
    console.log('salut');
    return await this.authService.signIn(signInDto);
  }
}
