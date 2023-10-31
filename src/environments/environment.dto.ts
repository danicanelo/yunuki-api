import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface EnvironmentDto {
  typeOrmModuleOptions: TypeOrmModuleOptions;
}
