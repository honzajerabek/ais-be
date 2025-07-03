import { assertBoundingRect } from '../services/vesselPosition/utils/assertBoundingRect'
import { parseBoundingRect } from '../services/vesselPosition/utils/parseBoundingRect'
import { getVesselPositionsForBoundingRect } from '../services/vesselPosition/getVesselPositionsForBoundingRect'
import { RequestHandler } from 'express'
import { assertBoundingRectSize } from './utils/assertBoundingRectSize'
import { BadRequestError } from './utils/BadRequestError'

export const getVesselsPosition: RequestHandler = async (req, res) => {
    try {
        assertBoundingRect(req.query)
        const boundingRect = parseBoundingRect(req.query)
        assertBoundingRectSize(boundingRect)
        const vessels = await getVesselPositionsForBoundingRect(boundingRect)

        res.json({
            vessels: vessels.map(vessel => ({
                mmsi: vessel.mmsi,
                cog: vessel.cog,
                sog: vessel.sog,
                timestamp: vessel.timestamp,
                shipName: vessel.shipName,
                latitude: vessel.coordinates.coordinates[1],
                longitude: vessel.coordinates.coordinates[0],
            })),
        })
    } catch (error) {
        if (error instanceof BadRequestError) {
            console.log(`Bad request: ${error.message}`)
            res.status(error.status).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
