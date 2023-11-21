import { Injectable, NotFoundException } from '@nestjs/common';
import { Yunuki } from './yunuki.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { User } from 'src/user/user.entity';

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
    // Asigna el nuevo Yunuki al usuario
    user.yunuki = newYunuki;
    // Guarda los cambios en el usuario y el nuevo Yunuki en los respectivos repositorios
    await this.userRepository.save(user);
    await this.yunukiRepository.save(newYunuki);
    return newYunuki;
  }

  // getYunuki(username: string) {
  //   const user = this.userRepository.findOne({
  //     where: {
  //       username,
  //     },
  //     relations: ['yunuki'],
  //   });
  //   if (!user) {
  //     throw new NotFoundException('El usuario no ha sido encontrado');
  //   }
  //   const yunuki = this.userRepository.save(user.yunukiId);
  //   return yunuki;
  // }
}
