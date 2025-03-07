// Update with your config settings.

import {
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
} from "../settings/serverSettings.js"

const dbConfig = {
    client: "mysql",
    connection: {
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
        host: DB_HOST,
        port: DB_PORT,
        charset: "utf8mb4",
    },
    pool: {
        min: 2,
        max: 10,
    },
}

export = {
    development: dbConfig,
    staging: dbConfig,
    production: dbConfig,
}
