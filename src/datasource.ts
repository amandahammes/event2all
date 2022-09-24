import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension"
import { MainSeeder } from './seeds/MainSeeder';

const port = process.env.DB_PORT as number | undefined

const options: DataSourceOptions & SeederOptions = {
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
    seeds: [MainSeeder]
}

export const AppDataSource = new DataSource(options)