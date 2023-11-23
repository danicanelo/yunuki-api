import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateYunukiDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  color: string;
  @IsDefined()
  @IsNotEmpty()
  breed: string;
}
