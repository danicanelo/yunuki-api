import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DeadYunuki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dead_age: number;

  @Column()
  dead_date: Date;

  @Column()
  dead_cause: string;

  @OneToOne(() => Yunuki)
  @JoinColumn()
  yunuki: Yunuki;

  @ManyToOne(() => User, (user) => user.deadyunukis)
  user: User;
}
