// Definimos aquí la clave secreta que utilizaremos para la firma del token, en un caso real debería ser mucho más compleja y quizá incluirse en una variable de entorno en vez de estar visible directamente en el código, pero aquí funciona a modo de ejemplo
export const jwtConstants = {
  secret: 'patata',
};
