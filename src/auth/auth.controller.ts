import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/userCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create')
  async createUser(@Body() userCredentialsDto: UserCredentialsDto) {
    return await this.authService.createUser(userCredentialsDto);
  }
}
