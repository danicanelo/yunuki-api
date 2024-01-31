import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

// En los ficheros module nos encargamos de relacionar todos los ficheros entre sí de forma que NestJS pueda operar. Por norma general: en controllers irán los ficheros controladores y en providers los ficheros que actúen como servicios. En imports indicamos las entidades con las que vamos a trabajar.

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
