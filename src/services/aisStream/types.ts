import { Infer } from 'superstruct'
import { aisStreamPositionReportMessageSchema } from './validation'

export type AISStreamPositionReport = {
    Cog: number;
    Sog: number;
    Latitude: number;
    Longitude: number;
    TrueHeading: number;
}

export type AISStreamMetadata = {
    MMSI: number;
    ShipName: string;
    time_utc: string;
}

export type AAISPositionReportMessage = Infer<typeof aisStreamPositionReportMessageSchema>
