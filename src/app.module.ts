import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
//import { DeadYunukisModule } from './dead-yunuki/dead-yunukis.module';
import { environment } from './environments/environment';
import { UsersModule } from './user/users.module';
import { YunukisModule } from './yunuki/yunukis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.typeOrmModuleOptions),
    //DeadYunukisModule,
    UsersModule,
    YunukisModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
