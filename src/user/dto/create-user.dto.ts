//import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
}
