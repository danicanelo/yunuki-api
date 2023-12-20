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
        //relations: ['yunukis'],
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      //user.yunukis.push(newYunuki);
      newYunuki.user = user;
      //await this.userRepository.save(user);
      await this.yunukiRepository.save(newYunuki);
      return newYunuki;
    }
  }

  async getAliveYunuki(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }
    const aliveYunuki = user.yunukis.find(function yunukiAlive(yunuki) {
      return yunuki.dead === null;
    });

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
    const deadYunukis = user.yunukis.filter(function deadYunukis(yunuki) {
      return yunuki.dead;
    });

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

  @Cron('*/30 * * * *') // '*/15 * * * *' para cada 15 min     '*/5 * * * * *' para cada 5 segundos
  async updateYunukis() {
    let yunukis = await this.yunukiRepository.find();
    yunukis = yunukis.map((yunuki) => {
      // Por cada yunuki establecemos la velocidad a la que suben sus parámetros, establecida en DB según la raza
      yunuki.hunger = this.getNewValue(yunuki.hunger, 6);
      yunuki.dirt = this.getNewValue(yunuki.dirt, 1);
      yunuki.tiredness = this.getNewValue(yunuki.tiredness, 2);
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
