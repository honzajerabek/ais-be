import { BoundingRect, BoundingRectString } from '../types'

export const parseBoundingRect = (stringBoundingRect: BoundingRectString): BoundingRect => ({
    minLon: parseFloat(stringBoundingRect.minLon),
    minLat: parseFloat(stringBoundingRect.minLat),
    maxLon: parseFloat(stringBoundingRect.maxLon),
    maxLat: parseFloat(stringBoundingRect.maxLat),
})
