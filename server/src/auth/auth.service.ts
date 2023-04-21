import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserDto } from 'src/auth/dto/get-user-dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthenticateUserDto } from './dto/authenticate-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authenticateUserDto: AuthenticateUserDto) {
    const { password } = authenticateUserDto;
    const getUserDto = authenticateUserDto as GetUserDto;
    const user = await this.userService.getUser(getUserDto);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        username: user?.username,
        id: user?.id,
      };
      return { accessToken: await this.jwtService.signAsync(payload) };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto);
    } catch (error) {
      return error;
    }
  }
}
