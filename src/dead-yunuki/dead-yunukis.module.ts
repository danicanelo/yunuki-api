import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { DeadYunuki } from './dead-yunuki.entity';
import { DeadYunukisController } from './dead-yunukis.controller';
import { DeadYunukisService } from './dead-yunukis.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeadYunuki, User, Yunuki])], //están bien insertados aquí?
  controllers: [DeadYunukisController],
  providers: [DeadYunukisService],
  exports: [DeadYunukisService],
})
export class DeadYunukisModule {}
