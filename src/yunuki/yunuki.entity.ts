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

  @Column()
  age: number;

  @Column()
  hunger: number;

  @Column()
  boredom: number;

  @Column()
  dirt: number;

  @Column()
  tiredness: number;

  @OneToOne(() => User)
  user: User;
}
