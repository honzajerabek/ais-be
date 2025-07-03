import Websocket from 'ws'
import { messagesBuffer } from '../services/aisStream/messagesBuffer'
import { handleMessage } from '../services/aisStream/handleMessage'

export let aisStreamClient: Websocket

export const startAisStreamClient = () => {
    if (aisStreamClient?.readyState === Websocket.OPEN) {
        aisStreamClient.removeAllListeners()
        aisStreamClient.close(1000, 'Server shutting down')
    }

    messagesBuffer.startAutoFlush()

    aisStreamClient = new Websocket(process.env.AIS_STREAM_API_URL)
        .on('open', () => {
            console.log('Connected to AIS Stream API')
            aisStreamClient.send(
                JSON.stringify({
                    Apikey: process.env.AIS_STREAM_API_KEY,
                    BoundingBoxes: [
                        [
                            [-90, -180],
                            [90, 180],
                        ],
                    ],
                    FilterMessageTypes: ['PositionReport'],
                })
            )
        })
        .on('message', handleMessage)
        .on('error', error => {
            console.error('Error connecting to AIS Stream API:', error)
        })
        .on('close', async (code, reason) => {
            console.log('Connection to AIS Stream API closed', code)
            messagesBuffer.stopAutoFlush()
            await messagesBuffer.flushBuffer()
            if (code !== 1000) {
                console.error('Reason:', reason.toString())
                // Attempt to reconnect after a delay
                setTimeout(startAisStreamClient, 1000)
            }
        })
        .on('ping', () => {
            console.log('Received ping from AIS Stream API')
        })
        .on('pong', () => {
            console.log('Sent pong to AIS Stream API')
        })
        .on('unexpected-response', (request, response) => {
            console.error('Unexpected response from AIS Stream API:', response.statusCode, response.statusMessage)
        })
}
