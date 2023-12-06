import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { Repository } from 'typeorm';
import { DeadYunuki } from './dead-yunuki.entity';

@Injectable()
export class DeadYunukisService {
  constructor(
    @InjectRepository(DeadYunuki)
    private deadYunukiRepository: Repository<DeadYunuki>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Yunuki)
    private yunukiRepository: Repository<Yunuki>,
  ) {}

  async killYunuki(user: User, yunuki: Yunuki) {
    const deadYunuki = this.deadYunukiRepository.create({
      dead_age: this.getDeadAge(yunuki),
      dead_date: new Date(),
      dead_cause: 'hunger',
      yunuki,
      user,
    });
    await this.deadYunukiRepository.save(deadYunuki);
    await this.yunukiRepository.delete(yunuki); //no está funcionando
  }

  private getDeadAge(yunuki: Yunuki) {
    const now = new Date();
    const deadAge = now.getTime() - yunuki.birth.getTime();
    return Math.floor(deadAge / 86400000);
  }

  async getDeadYunukis(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['deadyunukis'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }
    return user.deadyunukis;
  }
}
