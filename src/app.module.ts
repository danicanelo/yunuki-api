import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BreedModule } from './breed/breed.module';
import { environment } from './environments/environment';
import { UsersModule } from './user/users.module';
import { YunukisModule } from './yunuki/yunukis.module';

// Este fichero se encarga de importar y configurar los módulos de toda la aplicación.

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.typeOrmModuleOptions),
    UsersModule,
    YunukisModule,
    AuthModule,
    BreedModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
