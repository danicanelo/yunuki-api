import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Establecemos un DTO que nos permita instanciar objetos de tipo TypeOrmModuleOptions, interfaz propia de TypeORM que define la estructura y los tipos de las opciones que se pueden proporcionar al configurar un módulo de TypeORM
export interface EnvironmentDto {
  typeOrmModuleOptions: TypeOrmModuleOptions;
}
