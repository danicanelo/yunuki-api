import { IsDefined, IsNotEmpty } from 'class-validator';

// PEND, diferencias entre @IsDefined y @IsNotEmpty
export class CreateBreedDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsDefined()
  hunger_points: number;
  @IsNotEmpty()
  @IsDefined()
  dirt_points: number;
  @IsNotEmpty()
  @IsDefined()
  tiredness_points: number;
  @IsNotEmpty()
  @IsDefined()
  color: string;
  @IsNotEmpty()
  @IsDefined()
  form: string;
}
