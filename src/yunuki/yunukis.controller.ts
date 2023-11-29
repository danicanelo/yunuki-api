import {
  Body,
  Controller,
  Get,
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
      newYunuki,
      request['user'].username,
    );
  }

  @Get('get')
  getYunuki(@Request() request: Request): Promise<Yunuki> {
    return this.yunukisService.getYunuki(request['user'].username);
  }
}
