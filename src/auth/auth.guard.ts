//La lógica de este fichero permite evaluar si un usuario debe tener acceso o no a determinados endpoints. Para ello obtiene el token de la solicitud (si lo hay) y verifica si coincide con el que el servidor almacenó al crear al usuario

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

// PEND
@Injectable()
// La clase AuthGuard implementa CanActivate (interfaz propia de Nest JS que nos permitirá acceder a canActivate, método necesario para evaluar si la acción del usuario debe permitirse o no)
export class AuthGuard implements CanActivate {
  // El constructor instancia un objeto de acceso privado de tipo JwtService (clase propia de Nest JS)
  constructor(private jwtService: JwtService) {}

  // Esta función (que podemos usar gracias a la implementación de CanActivate) devuelve un booleano que determinará si la petición del usuario debe ser permitida (true) o no (false). Como parámetro recibe un objeto de tipo ExecutionContext que contiene, entre otras cosas, la información que necesitamos sobre la solicitud HTTP. La establecemos como async porque necesitaremos incluir await en ciertas partes obligando a éstas a que aguarden hasta terminar sus instrucciones para continuar con el programa
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Almacenamos de forma legible la petición HTTP del usuario. Para ello hacemos uso de switchToHttp, que limita la info obtenida por ExecutionContext al ámbito de las solicitudes HTTP, seguido de getRequest, que obtiene por fin el contenido de la solicitud
    const request = context.switchToHttp().getRequest();
    // Almacenamos el token de la solicitud haciendo uso de un método privado propio establecido más abajo, pasándole como parámetro la request obtenida anteriormente
    const token = this.extractTokenFromHeader(request);
    // Si token es undefined, lanzamos una excepción de No Autorizado
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
