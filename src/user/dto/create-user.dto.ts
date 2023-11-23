import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
