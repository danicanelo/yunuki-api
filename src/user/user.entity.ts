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

  @Column() //añadir unique=true, no sé cómo 
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Yunuki)
  @JoinColumn()
  yunuki: Yunuki;

  @OneToMany(() => DeadYunuki, (deadyunuki) => deadyunuki.user)
  deadyunukis: DeadYunuki[];
}
