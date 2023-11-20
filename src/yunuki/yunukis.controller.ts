import { Body, Controller, Post, Request, UseGuards, Get, Param, ParseIntPipe } from '@nestjs/common';
import { YunukisService } from './yunukis.service';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { Yunuki } from './yunuki.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('yunukis')
export class YunukisController {
  constructor(private readonly yunukisService: YunukisService) {}

  @Post()
  createYunuki(
    @Body() newYunuki: CreateYunukiDto,
    @Request() request: Request,
  ): Promise<Yunuki> {
    return this.yunukisService.createYunuki(
      newYunuki,
      request['user'].username,
    );
  }

//   @Get()
//   getYunuki(@Param('username', ParseIntPipe) username: string): Promise<Yunuki> {
//     return this.yunukisService.getYunuki(username);
//   }
}
