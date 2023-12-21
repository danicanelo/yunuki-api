import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { Yunuki } from './yunuki.entity';
import { YunukisService } from './yunukis.service';

// Indicamos qué ocurrirá al solicitar el end-point 'yunukis'. Utilizamos guardia porque, para acceder a cualquier enpoint de esta clase, necesitamos ser un usuario registrado y logeado
@UseGuards(AuthGuard)
@Controller('yunukis')
// Creamos la clase que actuará como controlador del módulo
export class YunukisController {
  // El constructor automáticamente instancia un objeto de tipo YunukisService para que podamos conectar con el servicio procedente
  constructor(private readonly yunukisService: YunukisService) {}

  // Al hacer una solicitud HTTP POST a la ruta 'yunukis/create': 1) Se ejecuta la función que obtiene como argumentos un objeto de tipo CreateYunukiDto, del que se espera un nombre y una raza seleccionable (valores obtenidos del cuerpo de la solicitud), y la solicitud en sí. 2) Llama a la función homónima del servicio pasándole como argumentos el objeto con los valores y el nombre de usuario obtenido de la solicitud, esta función se encargará de introducir el registro en la base de datos. 3) Devuelve el yunuki creado
  @Post('create')
  createYunuki(
    @Body() newYunuki: CreateYunukiDto,
    @Request() request: Request,
  ): Promise<Yunuki> {
    return this.yunukisService.createYunuki(
      newYunuki,
      request['user'].username,
    );
  }

  // Al hacer una solicitud HTTP GET a la ruta 'yunukis/get': 1) Se ejecuta una función que obtiene como argumento la solicitud. 2) Llama a la función homónima del servicio pasándole como argumento el nombre de usuario, obtenido de la solicitud. Esto es porque en base al usuario que ha realizado la solicitud buscaremos a su yunuki vivo asociado. 3) Devolvemos el yunuki encontrado
  @Get('get')
  getAliveYunuki(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.getAliveYunuki(request['user'].username);
  }

  // Para encontrar los yunukis muertos el proceso es similar solo que haciendo uso de su método correspondiente y sabiendo que nos devolverá un array, dado que un usuario puede tener más de un yunuki muerto
  @Get('get-dead')
  getDeadYunukis(@Request() request: Request): Promise<Yunuki[]> {
    return this.yunukisService.getDeadYunukis(request['user'].username);
  }

  // Los siguientes tres métodos sirven para ejecutar las acciones de cuidado del yunuki (alimentar, limpiar y dormir). Como son exactamente iguales, únicamente describiremos la primera. Al hacer una solicitud HTTP PUT a la ruta 'yunukis/feed' ejecutamos la función que obtiene como argumento la solicitud. Llama a la función homónima del servicio pasándole como argumento el nombre de usuario obtenido en la solicitud, esta función se encargará de setear a 0 el valor de hambre del yunuki en la base de datos. Lo mismo para 'clean' y 'sleep'
  @Put('feed')
  feed(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.feed(request['user'].username);
  }

  @Put('clean')
  clean(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.clean(request['user'].username);
  }

  @Put('sleep')
  sleep(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.sleep(request['user'].username);
  }
}
