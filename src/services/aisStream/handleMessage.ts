import { assert } from 'superstruct'
import { aisStreamPositionReportMessageSchema } from './validation'
import { messagesBuffer } from './messagesBuffer'

export const handleMessage = (data: string) => {
    try {
        const message = JSON.parse(data)

        assert(message, aisStreamPositionReportMessageSchema)

        messagesBuffer.addMessage(message)
    } catch (error) {
        console.error('Error parsing AIS Stream message:', error)
    }
}
