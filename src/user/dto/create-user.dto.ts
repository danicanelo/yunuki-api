/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { isStrongPassword } from 'src/common/decorators/is-strong-password.decorator';
import { isCustomEmail } from 'src/common/decorators/custom-email.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  username: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @isCustomEmail()
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @isStrongPassword()
  password: string;
}
