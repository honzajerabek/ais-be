import { AAISPositionReportMessage } from './types'
import { bulkCreateVesselPositionFromAisMessage } from '../vesselPosition/bulkCreateVesselPositionFromAisMessage'

const BUFFER_LIMIT = 500
const FLUSH_INTERVAL_MS = 1000
const buffer: AAISPositionReportMessage[] = []
let timeoutId: NodeJS.Timeout | null = null

export const messagesBuffer = {
    buffer,

    addMessage: (message: AAISPositionReportMessage) => {
        buffer.push(message)

        if (buffer.length >= BUFFER_LIMIT) {
            messagesBuffer.flushBuffer()
        }
    },

    flushBuffer: async () => {
        const messages = buffer.splice(0, BUFFER_LIMIT)

        await bulkCreateVesselPositionFromAisMessage({
            messages,
        })
    },

    startAutoFlush: () => {
        timeoutId = setInterval(messagesBuffer.flushBuffer, FLUSH_INTERVAL_MS)
    },

    stopAutoFlush: () => {
        if (timeoutId) {
            clearInterval(timeoutId)
        }
    },
}
