# Yunuki API

![Node Version](https://img.shields.io/badge/Node_version-18.16.0-green)
![NPM Version](https://img.shields.io/badge/NPM_version-9.5.1-red)

## Descripción

API para la aplicación Yunuki.

## Pasos previos

Crear una base de datos MySQL vacía a la que conectar la API (nombre por defecto: `yunuki_db`, configurar `port`, `username` y `password` en `src/environments/environment.ts`).

La API generará las tablas al conectar con la base de datos.

## Instalación de dependencias

```bash
$ npm install
```

## Lanzar la aplicación

```bash
$ npm run start
```

## Modo desarrollo (reinicio automático tras cualquier cambio)

```bash
$ npm run start:dev
```

