import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { Yunuki } from './yunuki.entity';
import { YunukisService } from './yunukis.service';

@UseGuards(AuthGuard)
@Controller('yunukis')
export class YunukisController {
  constructor(private readonly yunukisService: YunukisService) {}

  @Post('create')
  createYunuki(
    @Body() newYunuki: CreateYunukiDto,
    @Request() request: Request,
  ): Promise<Yunuki> {
    return this.yunukisService.createYunuki(
      newYunuki, // aquí van los datos del Yunuki, en el cuerpo de la solicitud
      request['user'].username, // aquí va el usuario que realiza la solicitud
    );
    /*Hasta aquí simplemente llamamos al método createYunuki del servicio yunukisService y le pasamos los datos del nuevo Yunuki y el nombre de usuario del solicitante. Después retornamos el yunuki creado*/
  }

  @Get('get')
  getYunuki(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.getYunuki(request['user'].username);
  }
}
