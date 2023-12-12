import { IsDefined, IsNotEmpty } from 'class-validator';
import { Breed } from 'src/breed/breed.entity';

export class CreateYunukiDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  breed: Breed;
}
