import { aisStreamClient } from './api/aisStreamClient'
import Websocket from 'ws'

export const shutdown = () => {
    console.log('Shutting down...')

    // Close WebSocket if connected
    if (aisStreamClient.readyState === Websocket.OPEN) {
        aisStreamClient.close(1000, 'Server shutting down')
        console.log('closed aisStreamClient')
    }
}
