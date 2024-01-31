import { IsNotEmpty } from 'class-validator';
import { Breed } from 'src/breed/breed.entity';

export class CreateYunukiDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  breed: Breed;
}
