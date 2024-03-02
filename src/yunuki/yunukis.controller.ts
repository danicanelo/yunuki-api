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
      newYunuki,
      request['user'].username,
    );
  }

  @Get('get')
  getAliveYunuki(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.getAliveYunuki(request['user'].username);
  }

  @Get('get-dead')
  getDeadYunukis(@Request() request: Request): Promise<Yunuki[]> {
    return this.yunukisService.getDeadYunukis(request['user'].username);
  }

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
