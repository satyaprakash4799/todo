import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';
import { AuthenticateUserDto } from './dto/authenticate-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signin')
  async signIn(@Body() authenticateUserDto: AuthenticateUserDto) {
    return this.authService.signIn(authenticateUserDto);
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
