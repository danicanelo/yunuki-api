// Establecer una interfaz nos permite fijar la estructura de datos que se debe usar al realizar una acción determinada, en este caso iniciar sesión en la aplicación.
export default interface LoginDto {
  username: string;
  password: string;
}
