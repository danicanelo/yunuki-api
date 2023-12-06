import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeadYunuki } from './dead-yunuki.entity';
import { DeadYunukisService } from './dead-yunukis.service';

@UseGuards(AuthGuard)
@Controller('dead-yunukis')
export class DeadYunukisController {
  constructor(private readonly deadYunukisService: DeadYunukisService) {}

  @Get('get')
  getDeadYunukis(@Request() request: Request): Promise<DeadYunuki[]> {
    return this.deadYunukisService.getDeadYunukis(request['user'].username);
  } //comprobar que está funcionando
}
