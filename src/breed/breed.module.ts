import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedController } from './breed.controller';
import { Breed } from './breed.entity';
import { BreedService } from './breed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],
  controllers: [BreedController],
  providers: [BreedService],
  exports: [BreedService],
})
export class BreedModule {}
