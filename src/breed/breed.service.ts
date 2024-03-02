import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {
    this.populate();
  }

  getBreeds() {
    return this.breedRepository.find();
  }

  private async populate() {
    const total = await this.breedRepository.count();
    if (total === 0) {
      this.createBreed({
        name: 'Yanaka',
        hunger_points: 2,
        dirt_points: 5,
        tiredness_points: 3,
        info: 'Los Yanaka son verdes y tienen forma de huevo. Como les encanta jugar, tienden a ensuciarse más que otras razas.',
      });
      this.createBreed({
        name: 'Yonoko',
        hunger_points: 5,
        dirt_points: 3,
        tiredness_points: 2,
        info: 'Los Yonoko son morados, grandotes y solo piensan en comer.',
      });
      this.createBreed({
        name: 'Yiniki',
        hunger_points: 3,
        dirt_points: 2,
        tiredness_points: 5,
        info: 'Los Yiniki son amarillos y, como la parte superior de la cabeza les pesa tanto, tienden a cansarse rápido y necesitan dormir a menudo.',
      });
    }
  }

  createBreed(breed: CreateBreedDto) {
    const newBreed = this.breedRepository.create(breed);
    return this.breedRepository.save(newBreed);
  }
}
