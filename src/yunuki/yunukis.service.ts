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

  // Esta expresión de cron ejecuta updateYunukis cada hora
  @Cron('0 * * * *')
  async updateYunukis() {
    let yunukis = await this.yunukiRepository.find();
    // yunukis contiene todos los yunukis vivos
    yunukis = yunukis.map((yunuki) => {
      // Por cada Yunuki, actualizamos sus valores:
      yunuki.hunger = this.getNewValue(yunuki.hunger);
      yunuki.tiredness = this.getNewValue(yunuki.tiredness);
      yunuki.dirt = this.getNewValue(yunuki.dirt);
      return yunuki;
    });
    // Ahora yunukis contiene los valores actualizados
    this.yunukiRepository.save(yunukis);
    // Falta la parte de matar aquellos que tengan todo a 10
  }

  private getNewValue(oldValue: number) {
    const newValue = oldValue + this.getIncrease();
    return Math.min(newValue, 10);
  }

  private getIncrease() {
    // Devuelve un número aleatorio entre 1 y 3
    return Math.floor(Math.random() * 3) + 1;
  }
}
