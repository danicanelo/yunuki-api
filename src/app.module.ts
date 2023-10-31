import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeadYunukisModule } from './dead-yunukis/dead-yunukis.module';
import { environment } from './environments/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.typeOrmModuleOptions),
    DeadYunukisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
