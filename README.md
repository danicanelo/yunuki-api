# Yunuki API

## Description

Backend API for the Yunuki virtual pet application (https://github.com/danicanelo/yunuki-app)

## Prerequisites

- Create an empty MySQL database (default name: `yunuki_db`)
- Configure database connection in `src/environments/environment.ts`

The API will automatically generate required tables on first connection.

## 🚀 Quick Start

1.  Install dependencies:

    `npm install`

2.  Create a .env file in the root directory and fill it as follows:

    ```
    DB_TYPE=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=your_user_name
    DB_PASSWORD=your_password
    DB_DATABASE=yunuki_db
    JWT_SECRET=any_secret_key
    ```

3.  Start the app:

    `npm run start:dev`







