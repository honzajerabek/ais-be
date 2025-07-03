import { AISStreamPositionReport } from './types'
import { number, type, string, enums, object } from 'superstruct'

export const positionReportSchema = type({
    Cog: number(),
    Sog: number(),
    Latitude: number(),
    Longitude: number(),
    TrueHeading: number(),
})

export const metadataSchema = type({
    MMSI: number(),
    ShipName: string(),
    time_utc: string(),
})



export const aisStreamPositionReportMessageSchema = object({
    MessageType: enums(['PositionReport']),
    Message: object({
        PositionReport: positionReportSchema,
    }),
    MetaData: metadataSchema,
})



