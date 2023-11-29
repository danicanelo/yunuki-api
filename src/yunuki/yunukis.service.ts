import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { Yunuki } from './yunuki.entity';

@Injectable()
export class YunukisService {
  constructor(
    @InjectRepository(Yunuki) private yunukiRepository: Repository<Yunuki>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createYunuki(yunuki: CreateYunukiDto, username: string) {
    const newYunuki = this.yunukiRepository.create(yunuki);
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunuki'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.yunuki = newYunuki;
    await this.userRepository.save(user);
    await this.yunukiRepository.save(newYunuki);
    return newYunuki;
  }

  async getYunuki(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunuki'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }
    if (!user.yunuki) {
      throw new NotFoundException('El usuario no tiene ningún yunuki asociado');
    }

    return user.yunuki;
  }
}
