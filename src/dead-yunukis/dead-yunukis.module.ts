import { Module } from '@nestjs/common';
import { DeadYunukisController } from './dead-yunukis.controller';
import { DeadYunukisService } from './dead-yunukis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeadYunuki } from './dead-yunuki.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeadYunuki])],
  controllers: [DeadYunukisController],
  providers: [DeadYunukisService],
})
export class DeadYunukisModule {}
