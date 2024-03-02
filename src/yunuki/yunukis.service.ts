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
    try {
      const aliveYunuki = await this.getAliveYunuki(username);
      return aliveYunuki;
    } catch (e) {
      const newYunuki = this.yunukiRepository.create(yunuki);
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      newYunuki.user = user;
      await this.yunukiRepository.save(newYunuki);
      return newYunuki;
    }
  }

  async getAliveYunuki(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis', 'yunukis.breed'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }

    const aliveYunuki = user.yunukis.find((yunuki) => yunuki.dead === null);

    if (!aliveYunuki) {
      throw new NotFoundException(
        'El usuario no está cuidando un yunuki ahora mismo',
      );
    }

    return aliveYunuki;
  }

  async getDeadYunukis(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }

    const deadYunukis = user.yunukis.filter((yunuki) => yunuki.dead);

    return deadYunukis;
  }

  async feed(username: string) {
    const yunuki = await this.getAliveYunuki(username);
    yunuki.hunger = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  async clean(username: string) {
    const yunuki = await this.getAliveYunuki(username);
    yunuki.dirt = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  async sleep(username: string) {
    const yunuki = await this.getAliveYunuki(username);
    yunuki.tiredness = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  @Cron('*/5 * * * *')
  async updateYunukis() {
    const actualDate = new Date();
    let yunukis = await this.yunukiRepository.find({ relations: ['breed'] });
    yunukis = yunukis.map((yunuki) => {
      this.oldYunuki(yunuki, actualDate);
      yunuki.hunger = this.getNewValue(
        yunuki.hunger,
        yunuki.breed.hunger_points,
      );
      yunuki.dirt = this.getNewValue(yunuki.dirt, yunuki.breed.dirt_points);
      yunuki.tiredness = this.getNewValue(
        yunuki.tiredness,
        yunuki.breed.tiredness_points,
      );
      return yunuki;
    });
    this.yunukiRepository.save(yunukis);

    const deadYunukis = yunukis.filter((yunuki) => {
      return yunuki.hunger >= 10 || yunuki.dirt >= 10 || yunuki.tiredness >= 10;
    });
    deadYunukis.map((yunuki) => {
      this.ripYunuki(yunuki);
    });
  }

  private oldYunuki(yunuki: Yunuki, date: Date) {
    const diff = date.getTime() - yunuki.birth.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 14) {
      this.ripYunuki(yunuki);
    }
  }

  private ripYunuki(yunuki: Yunuki) {
    yunuki.dead = new Date();
    this.yunukiRepository.save(yunuki);
  }

  private getNewValue(oldValue: number, maxValue: number) {
    const newValue = oldValue + this.getIncrease(maxValue);
    return Math.min(newValue, 10);
  }

  private getIncrease(maxValue: number) {
    return Math.floor(Math.random() * (maxValue - 1)) + 1;
  }
}
