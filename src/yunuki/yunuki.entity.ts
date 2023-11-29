import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Yunuki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  color: string;

  @CreateDateColumn()
  birth: Date;

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
}
