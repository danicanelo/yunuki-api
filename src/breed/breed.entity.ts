import { Yunuki } from 'src/yunuki/yunuki.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @Entity genera una representación de una tabla concreta en la base de datos. Cada instancia que hagamos de la clase que contiene (Breed en este caso) se añadirá como un registro (una fila) en la tabla real.
 * @PrimaryGeneratedColumn indica que el campo que contiene debe generarse automáticamente y ser la clave primaria de la tabla
 * @Column indica sencillamente una columna
 * @OneToMany indica que la tabla (entidad) actual (Breed) tiene una relación de uno a muchos con otra entidad indicada (en este caso Yunuki)
 */

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
  info: string;

  @OneToMany(() => Yunuki, (yunuki) => yunuki.breed)
  yunukis: Yunuki[];
}
