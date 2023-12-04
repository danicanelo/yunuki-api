import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeadYunuki } from './dead-yunuki.entity';
import { DeadYunukisController } from './dead-yunukis.controller';
import { DeadYunukisService } from './dead-yunukis.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeadYunuki])],
  controllers: [DeadYunukisController],
  providers: [DeadYunukisService],
  exports: [DeadYunukisService],
})
export class DeadYunukisModule {}
