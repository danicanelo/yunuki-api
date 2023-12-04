import { Injectable } from '@nestjs/common';
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
  }

  private getDeadAge(yunuki: Yunuki) {
    const now = new Date();
    const deadAge = now.getTime() - yunuki.birth.getTime();
    return Math.floor(deadAge / 86400000);
  }
}
