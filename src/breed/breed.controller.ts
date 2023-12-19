import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Breed } from './breed.entity';
import { BreedService } from './breed.service';

// Hacemos uso de nuestra guardia para garantizar que solo pueda acceder al end-point 'breed' un usuario correctamente logeado
@UseGuards(AuthGuard)
// Indicamos qué ocurrirá al solicitar el end-point 'breed'
@Controller('breed')
// Creamos la clase que actuará como controlador del módulo
export class BreedController {
  // El constructor automáticamente instancia un objeto de tipo BreedService para que podamos conectar con el servicio procedente
  constructor(private readonly breedService: BreedService) {}

  // Al hacer una solicitud HTTP GET a la ruta 'breed/get' se ejecuta la función del controlador que llama a la función homónima del servicio, de la que se espera que devuelva un array de Breed (las tres diferentes razas de Yunuki que hemos dispuesto)
  @Get('get')
  getBreeds(): Promise<Breed[]> {
    return this.breedService.getBreeds();
  }
}
