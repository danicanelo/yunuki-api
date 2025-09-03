import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // this.populate();
  }

  async createUser(user: CreateUserDto) {
    const userExists = await this.userExists(user);
    if (userExists) {
      return null;
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  private userExists(user: CreateUserDto) {
    return this.userRepository.exist({
      where: [
        {
          username: user.username,
        },
        {
          email: user.email,
        },
      ],
    });
  }

  getUser(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
  }

  private async populate() {
    const total = await this.userRepository.count();
    if (total === 0) {
      this.createUser({
        username: 'yunukiDemo',
        email: 'testing@testing.com',
        password: '123456Az',
      });
    }
  }
}
