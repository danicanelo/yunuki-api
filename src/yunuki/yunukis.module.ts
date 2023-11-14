import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yunuki } from './yunuki.entity';
import { YunukisController } from './yunukis.controller';
import { YunukisService } from './yunukis.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Yunuki, User])],
  controllers: [YunukisController],
  providers: [YunukisService],
})
export class YunukisModule {}
