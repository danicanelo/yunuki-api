import { Yunuki } from 'src/yunuki/yunuki.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @Entity genera una representación de una tabla concreta en la base de datos. Cada instancia que hagamos de la clase que contiene (User en este caso) se añadirá como un registro (una fila) en la tabla real.
 * @PrimaryGeneratedColumn indica que el campo que contiene debe generarse automáticamente y ser la clave primaria de la tabla
 * @Column indica sencillamente una columna
 * @OneToMany indica que la tabla (entidad) actual (User) tiene una relación de uno a muchos con otra entidad indicada (en este caso Yunuki)
 */

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
