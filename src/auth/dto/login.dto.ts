import { IsNotEmpty } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
