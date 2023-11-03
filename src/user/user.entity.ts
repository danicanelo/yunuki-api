import { DeadYunuki } from 'src/dead-yunuki/dead-yunuki.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => DeadYunuki, (deadyunuki) => deadyunuki.user)
  deadyunukis: DeadYunuki[];
}
