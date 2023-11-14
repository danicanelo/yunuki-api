import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Yunuki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  breed: string;

  @Column()
  birth: Date;

  @Column({
    default: 0,
  })
  hunger: number;

  @Column({
    default: 0,
  })
  boredom: number;

  @Column({
    default: 0,
  })
  dirt: number;

  @Column({
    default: 0,
  })
  tiredness: number;
}
