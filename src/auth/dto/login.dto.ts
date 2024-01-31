import { IsNotEmpty } from 'class-validator';

// Establecer un DTO (Data Transfer Object) nos permite fijar la estructura de datos que se debe seguir al realizar una acción determinada, en este caso iniciar sesión en la aplicación. IsNotEmpty obliga a que el campo sea rellenado.
export default class LoginDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
