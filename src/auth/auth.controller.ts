import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDataDto } from './dto/userData.dto';
import { SignInDto } from './dto/signInDto';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createUser(@Body() userDataDto: UserDataDto) {
    return await this.authService.createUser(userDataDto);
  }

  @Post('/login')
  async signIn(@Body() signInDto: SignInDto) {
    console.log('salut');
    return await this.authService.signIn(signInDto);
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteUser(@Body() body) {
    await this.authService.deleteUser(body.userName);
  }
}
