import { DeadYunuki } from 'src/dead-yunuki/dead-yunuki.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  }) 
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Yunuki, {
    cascade: true,
  })
  @JoinColumn()
  yunuki: Yunuki;

  @OneToMany(() => DeadYunuki, (deadyunuki) => deadyunuki.user)
  deadyunukis: DeadYunuki[];
}
