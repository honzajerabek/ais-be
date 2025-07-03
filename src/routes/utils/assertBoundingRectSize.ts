import { BoundingRect } from '../../services/vesselPosition/types'
import { BadRequestError } from './BadRequestError'

/**
 * Asserts that the the bounding box has not reached the maximum size.
 * Limiting the size of the bounding box is important to prevent performance issues
 * maximum is ~100nm²
 * The calculation is not accurate, due to longitude convergence, but it is good enough for our use case.
 */
export const assertBoundingRectSize = (boundingRect: BoundingRect) => {
    const { minLat, minLon, maxLat, maxLon } = boundingRect

    const latDiff = Math.abs(maxLat - minLat)
    const lonDiff = Math.abs(maxLon - minLon)

    // Convert degrees to nautical miles (1 degree latitude ~ 60 nautical miles)
    const latSize = latDiff * 60
    const lonSize = lonDiff * 60

    const area = latSize * lonSize

    if (area > 100) {
        throw new BadRequestError('Bounding box size exceeds maximum allowed size of 100nm²')
    }
}
