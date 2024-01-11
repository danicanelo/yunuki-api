import { Breed } from 'src/breed/breed.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @Entity genera una representación de una tabla concreta en la base de datos. Cada instancia que hagamos de la clase que contiene (Yunuki en este caso) se añadirá como un registro (una fila) en la tabla real.
@Entity()
export class Yunuki {
  // @PrimaryGeneratedColumn indica que el campo que contiene debe generarse automáticamente y ser la clave primaria de la tabla
  @PrimaryGeneratedColumn()
  id: number;

  // @Column indica sencillamente una columna
  @Column()
  name: string;

  @CreateDateColumn()
  birth: Date;

  @Column({
    nullable: true, // Indicamos que el valor del campo debe poderse establecer en NULL. Hacemos esto porque esta será nuestra manera de separar a los yunukis vivos de los muertos, si tiene este campo NULL es que aún está vivo
  })
  dead: Date;

  @Column({
    default: 0, // Con default indicamos el valor inicial del campo
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

  // @ManyToOne indica que la tabla (entidad) actual (Yunuki) tiene una relación de muchos a uno respecto a las entidades indicadas (User y Breed)
  @ManyToOne(() => Breed, (breed) => breed.yunukis)
  breed: Breed;

  @ManyToOne(() => User, (user) => user.yunukis)
  user: User;
}
