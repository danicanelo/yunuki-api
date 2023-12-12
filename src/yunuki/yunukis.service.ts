import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DeadYunukisService } from 'src/dead-yunuki/dead-yunukis.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { Yunuki } from './yunuki.entity';

@Injectable()
export class YunukisService {
  constructor(
    @InjectRepository(Yunuki) private yunukiRepository: Repository<Yunuki>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private deadYunukiService: DeadYunukisService,
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

  @Cron('*/15 * * * *')
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
      return yunuki.hunger + yunuki.dirt + yunuki.tiredness >= 10;
    }); //PROV, no queremos que mueran al sumar todo sino cuando una propiedad alcanza el tope (intentado ||, pero mata al yunuki en cuanto sube cualquier parámetro)
    deadYunukis.map((yunuki) => {
      this.ripYunuki(yunuki);
    });
  }

  private async ripYunuki(yunuki: Yunuki) {
    const user = await this.userRepository.findOne({
      where: {
        yunuki: { id: yunuki.id },
      },
      relations: ['yunuki'],
    });
    if (!user) {
      return;
    }
    user.yunuki = null;
    await this.userRepository.save(user);
    await this.deadYunukiService.killYunuki(user, yunuki);
  }

  private getNewValue(oldValue: number, maxValue: number) {
    const newValue = oldValue + this.getIncrease(maxValue);
    return Math.min(newValue, 10);
  }

  private getIncrease(maxValue: number) {
    return Math.floor(Math.random() * (maxValue - 1)) + 1;
  }
}
