import { BoundingRect } from './types'
import { dataSource } from '../../db/dataSource'
import { VesselPosition } from '../../db/entities'

type Params = BoundingRect

export const getVesselPositionsForBoundingRect = async ({ minLat, minLon, maxLat, maxLon }: Params) => {
    const result = await dataSource
        .getRepository(VesselPosition)
        .createQueryBuilder('vesselPosition')
        .where(
            `
      ST_Within(
        vesselPosition.coordinates,
        ST_MakeEnvelope(:minLon, :minLat, :maxLon, :maxLat, 4326)
      )
    `,
            {
                minLon,
                minLat,
                maxLon,
                maxLat,
            }
        )
        .andWhere("vesselPosition.timestamp > NOW() - INTERVAL '2 MINUTE'")
        .distinctOn(['vesselPosition.mmsi'])
        .orderBy('vesselPosition.mmsi', 'DESC')
        .addOrderBy('vesselPosition.timestamp', 'DESC')
        .getMany()

    return result
}
