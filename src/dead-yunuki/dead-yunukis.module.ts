import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/user/users.module';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { DeadYunuki } from './dead-yunuki.entity';
import { DeadYunukisController } from './dead-yunukis.controller';
import { DeadYunukisService } from './dead-yunukis.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeadYunuki, Yunuki]), UsersModule],
  controllers: [DeadYunukisController],
  providers: [DeadYunukisService],
  exports: [DeadYunukisService],
})
export class DeadYunukisModule {}
