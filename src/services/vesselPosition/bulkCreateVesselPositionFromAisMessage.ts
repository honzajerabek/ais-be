import { AAISPositionReportMessage } from '../aisStream/types'
import { entityManager } from '../../db/dataSource'
import { VesselPosition } from '../../db/entities'
import { DeepPartial } from 'typeorm'

type Params = {
    messages: AAISPositionReportMessage[]
}

export const bulkCreateVesselPositionFromAisMessage = async ({ messages }: Params) => {
    await entityManager.save<VesselPosition, DeepPartial<VesselPosition>>(
        VesselPosition,
        messages.map(
            message =>
                ({
                    mmsi: message.MetaData.MMSI,
                    shipName: message.MetaData.ShipName,
                    cog: message.Message.PositionReport.Cog,
                    sog: message.Message.PositionReport.Sog,
                    coordinates: {
                        type: 'Point',
                        coordinates: [
                            message.Message.PositionReport.Longitude,
                            message.Message.PositionReport.Latitude,
                        ],
                    },
                    trueHeading: message.Message.PositionReport.TrueHeading,
                    timestamp: new Date(message.MetaData.time_utc),
                }) as const
        )
    )
}
