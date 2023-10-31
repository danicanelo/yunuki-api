import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
