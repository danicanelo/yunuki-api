// Establecer un DTO (Data Transfer Object) nos permite fijar la estructura de datos que se debe seguir al realizar una acción determinada, en este caso iniciar sesión en la aplicación.
export default class LoginDto {
  username: string;
  password: string;
}
