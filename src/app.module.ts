/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BreedModule } from './breed/breed.module';
import { UsersModule } from './user/users.module';
import { YunukisModule } from './yunuki/yunukis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const type = configService.get<'mysql' | 'postgres'>('DB_TYPE');

        return {
          type,
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          ...(configService.get('DB_TYPE') === 'postgres' ? { ssl: true } : {}),
        } as ConnectionOptions;
      },
      inject: [ConfigService],
    }),
    UsersModule,
    YunukisModule,
    AuthModule,
    BreedModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
