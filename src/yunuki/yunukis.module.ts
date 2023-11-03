import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yunuki } from './yunuki.entity';
import { YunukisController } from './yunukis.controller';
import { YunukisService } from './yunukis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Yunuki])],
  controllers: [YunukisController],
  providers: [YunukisService],
})
export class YunukisModule {}
