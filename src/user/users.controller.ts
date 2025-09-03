/* eslint-disable prettier/prettier */
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async createUser(@Body() newUser: CreateUserDto): Promise<User> {
    const createUser = await this.usersService.createUser(newUser);
    if (!createUser) {
      throw new ConflictException(
        'El usuario y/o el email ya están en uso. Elige otro nombre de usuario y/o email.',
      );
    }
    return createUser;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUser(@Request() request: Request): Promise<User> {
    return this.usersService.getUser(request['user'].username);
  }
}
