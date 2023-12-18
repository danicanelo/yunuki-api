import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';

// Establecemos qué ocurrirá cuando el cliente solicite el endpoint 'auth'
@Controller('auth')
// Crea y exporta una clase que ejecutará las instrucciones contenidas en su constructor y que permitirá hacer uso de sus métodos allá donde sea instanciada, en este caso la usaremos como controlador, por lo que será llamada automáticamente una única vez desde el propio módulo (auth.module.ts)
export class AuthController {
  // Instanciar AuthController automáticamente ejecutará el contenido del constructor, instanciando un objeto de tipo AuthService que nos permitirá acceder a sus métodos, en este caso, lo que se está estableciendo es una relación entre nuestro controlador y nuestro servicio
  constructor(private authService: AuthService) {}

  // Establecemos el código de estado HTTP que se devolverá al cliente si las instrucciones a continuación son ejecutadas con éxito
  @HttpCode(HttpStatus.OK)
  // Establecemos qué ocurrirá cuando el cliente solicite realizar un POST con el end-point 'login'
  @Post('login')
  // Se ejecuta la función 'login' cuyo parámetro es el decorador @Body (que se encarga de obtener los datos del cuerpo de la solicitud) junto con un objeto de tipo 'LoginDto', que indica la estructura que deben cumplir los datos obtenidos (el "molde" en el que deben "encajar")
  login(@Body() loginDto: LoginDto) {
    // Enviamos los datos obtenidos (username y password) al método 'login', del que podemos hacer uso gracias a haber instanciado un objeto de tipo AuthService en el constructor. Este método devuelve al navegador, si todo ha ido correctamente, un token con la información (id y nombre de usuario) codificada
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
