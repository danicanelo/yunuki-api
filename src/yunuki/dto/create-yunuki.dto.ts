export class CreateYunukiDto {
    name: string;
    color: string;
    breed: string;
    // prueba: string;
    // He probado a añadir este campo aleatorio al dto y no me da ningún problema, crea el Yunuki igualmente en la base de datos. Por qué?
    // Ocurre lo mismo al meter vía POST campos no contemplados aquí en el dto. Se introduce el registro sin problemas.
  }