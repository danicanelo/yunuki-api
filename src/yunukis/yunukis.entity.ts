import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Yunuki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
}