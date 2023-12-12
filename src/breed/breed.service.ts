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
        name: 'Yonoko',
        hunger_points: 6,
        dirt_points: 2,
        tiredness_points: 2,
        color: 'green',
        form: 'square',
      });
    }
  }

  createBreed(breed: CreateBreedDto) {
    const newBreed = this.breedRepository.create(breed);
    return this.breedRepository.save(newBreed);
  }
}
