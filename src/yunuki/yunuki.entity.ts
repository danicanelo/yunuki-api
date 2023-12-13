import { Breed } from 'src/breed/breed.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Yunuki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  birth: Date;

  @CreateDateColumn()
  dead: Date;

  @Column({
    default: 0,
  })
  hunger: number;

  @Column({
    default: 0,
  })
  dirt: number;

  @Column({
    default: 0,
  })
  tiredness: number;

  @ManyToOne(() => Breed, (breed) => breed.yunukis)
  breed: Breed;

  @ManyToOne(() => User, (user) => user.yunukis)
  user: User;
}
