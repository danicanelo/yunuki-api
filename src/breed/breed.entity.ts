import { Yunuki } from 'src/yunuki/yunuki.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hunger_points: number;

  @Column()
  dirt_points: number;

  @Column()
  tiredness_points: number;

  @Column()
  color: string;

  @Column()
  form: string;

  @OneToMany(() => Yunuki, (yunuki) => yunuki.breed)
  yunukis: Yunuki[];
}
