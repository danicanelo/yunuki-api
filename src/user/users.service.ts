import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.populate();
  }

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUser(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
  }

  getUserWithRelations(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['deadyunukis', 'yunuki'],
    });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update({ id }, user);
  }

  private async populate() {
    const total = await this.userRepository.count();
    if (total === 0) {
      this.createUser({
        username: 'yunukiDemo',
        email: 'patata@patata.com',
        password: '1234',
      });
    }
  }
}
