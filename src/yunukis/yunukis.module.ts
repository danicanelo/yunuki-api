import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YunukisController } from './yunukis.controller';
import { Yunuki } from './yunukis.entity';
import { YunukisService } from './yunukis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Yunuki])],
  controllers: [YunukisController],
  providers: [YunukisService],
})
export class YunukisModule {}
