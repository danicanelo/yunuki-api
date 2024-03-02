import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Breed } from './breed.entity';
import { BreedService } from './breed.service';

@UseGuards(AuthGuard)
@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get('get')
  getBreeds(): Promise<Breed[]> {
    return this.breedService.getBreeds();
  }
}
