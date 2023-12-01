import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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

  async feed(username: string) {
    const yunuki = await this.getYunuki(username);
    yunuki.hunger = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  async clean(username: string) {
    const yunuki = await this.getYunuki(username);
    yunuki.dirt = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  async sleep(username: string) {
    const yunuki = await this.getYunuki(username);
    yunuki.tiredness = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  @Cron('0 * * * * *')
  async updateYunukis() {
    let yunukis = await this.yunukiRepository.find();
    yunukis = yunukis.map((yunuki) => {
      yunuki.hunger = this.getNewValue(yunuki.hunger, 6);
      yunuki.dirt = this.getNewValue(yunuki.dirt, 1);
      yunuki.tiredness = this.getNewValue(yunuki.tiredness, 2);
      return yunuki;
    });
    this.yunukiRepository.save(yunukis);
  }

  private getNewValue(oldValue: number, maxValue: number) {
    const newValue = oldValue + this.getIncrease(maxValue);
    return Math.min(newValue, 10);
  }

  private getIncrease(maxValue: number) {
    return Math.floor(Math.random() * (maxValue - 1)) + 1;
  }
}
