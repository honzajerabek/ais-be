import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import { dataSource } from './db/dataSource'
import { startAisStreamClient } from './api/aisStreamClient'
import { shutdown } from './shutdown'
import { getVesselsPosition } from './routes/getVesselsPosition'

dotenv.config()

const main = async () => {
    const app = express()
    const port = parseInt(process.env.SERVER_PORT)

    await dataSource.initialize()

    startAisStreamClient()

    app.get('/vessels-position', getVesselsPosition)

    app.listen(port, () => {
        console.log(`AIS server listening on port ${port}`)
    })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

main().catch(err => {
    console.error(err)
    process.exit(1)
})
