import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import * as entities from './entities'

dotenv.config()

export const dataSource = new DataSource({
    type: 'postgres',
    synchronize: false,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: Object.values(entities),
    migrations: ['dist/db/migrations/*.js'],
})

export const entityManager = dataSource.createEntityManager()
