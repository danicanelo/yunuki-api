import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';

// El decorador @Injectable permite que podamos usar la clase BreedService como dependencia. Esto nos servirá para hacer uso de ella como servicio.
@Injectable()
export class BreedService {
  constructor(
    // Instanciamos un objeto que actúe como un repositorio de tipo Breed, lo que nos permitirá tener acceso a todas las instancias de la entidad Breed (en la práctica es como si tuviéramos acceso a la propia tabla 'breed' de la base de datos con todos sus registros). Para ello inyectamos primero la clase Breed
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {
    // Usamos populate para generar, si no los hubiera, los registros de raza que necesitamos. La lógica se explica en el propio método un poco más abajo.
    this.populate();
  }

  // Método para obtener todas las razas del repositorio
  getBreeds() {
    return this.breedRepository.find();
  }

  // Método para generar los registros de razas que necesitamos si no los hubiera. Lo establecemos privado porque hacemos uso de él en esta misma clase y en ningún sitio más
  private async populate() {
    // Obtenemos el total de razas que hay. Como esta tabla de la base de datos va a ser fija (no se van a introducir ni eliminar registros, sino que solo va a servir de consulta y siempre va a contener las mismas razas), si el total es 0 significa que no hay registros y que, por lo tanto, la base de datos se acaba de crear. Por esto necesitamos rellenarla
    const total = await this.breedRepository.count();
    // Si el total es 0, le indicamos que cree tres registros con diferentes valores para las tres diferentes razas. Cada una de ellas tendrá un campo (hambre, suciedad o sueño) que subirá con mayor rapidez que las demás. Para esto hace uso del método createBreed establecido en esta misma clase.
    if (total === 0) {
      this.createBreed({
        name: 'Yanaka',
        hunger_points: 5,
        dirt_points: 3,
        tiredness_points: 2,
        info: 'Los Yanaka se caracterizan por tener mucho hambre y dormir poco.',
      });
      this.createBreed({
        name: 'Yonoko',
        hunger_points: 2,
        dirt_points: 5,
        tiredness_points: 3,
        info: 'Los Yonoko se caracterizan por ensuciarse mucho y comer poco.',
      });
      this.createBreed({
        name: 'Yiniki',
        hunger_points: 3,
        dirt_points: 2,
        tiredness_points: 5,
        info: 'Los Yiniki se caracterizan por dormir mucho y ensuciarse poco.',
      });
    }
  }

  // Obteniendo como argumento un objeto de tipo CreateBreedDto con los valores especificados para la creación de una raza, utilizamos este objeto para crear la raza y guardarla en la base de datos
  createBreed(breed: CreateBreedDto) {
    const newBreed = this.breedRepository.create(breed);
    return this.breedRepository.save(newBreed);
  }
}
