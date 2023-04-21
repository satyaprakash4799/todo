import { IsNotEmpty } from 'class-validator';
import { GetUserDto } from './get-user-dto';

export class AuthenticateUserDto extends GetUserDto {
  @IsNotEmpty()
  password: string;
}
