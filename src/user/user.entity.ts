import { Yunuki } from 'src/yunuki/yunuki.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Yunuki, (yunuki) => yunuki.user)
  yunukis: Yunuki[];
}
