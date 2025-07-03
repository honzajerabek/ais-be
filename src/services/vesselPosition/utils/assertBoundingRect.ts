import { BoundingRectString } from '../types'
import { ParsedQs } from 'qs'
import { BadRequestError } from '../../../routes/utils/BadRequestError'

type BoundingRectAssert = (value: ParsedQs) => asserts value is BoundingRectString

export const assertBoundingRect: BoundingRectAssert = (value: ParsedQs) => {
    const isBoundingRect =
        !!value &&
        typeof value === 'object' &&
        'minLon' in value &&
        typeof value.minLon === 'string' &&
        'minLat' in value &&
        typeof value.minLat === 'string' &&
        'maxLon' in value &&
        typeof value.maxLon === 'string' &&
        'maxLat' in value &&
        typeof value.maxLat === 'string'

    if (!isBoundingRect) {
        throw new BadRequestError('Invalid BoundingRect object')
    }
}
