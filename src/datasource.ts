import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

const options: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    "extra": {
        "connectionLimit": 5
    }
}

export const AppDataSource = new DataSource(options);
