import { IsNotEmpty } from 'class-validator';

export class CreateBreedDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  hunger_points: number;
  @IsNotEmpty()
  dirt_points: number;
  @IsNotEmpty()
  tiredness_points: number;
  @IsNotEmpty()
  info: string;
}
