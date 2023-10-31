import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeadYunukisModule } from './dead-yunukis/dead-yunukis.module';
import { environment } from './environments/environment';
import { UsersModule } from './users/users.module';
import { YunukisModule } from './yunukis/yunukis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.typeOrmModuleOptions),
    DeadYunukisModule,
    UsersModule,
    YunukisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
