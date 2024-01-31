import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Yunuki } from './yunuki.entity';
import { YunukisController } from './yunukis.controller';
import { YunukisService } from './yunukis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Yunuki, User])],
  controllers: [YunukisController],
  providers: [YunukisService],
})
export class YunukisModule {}
