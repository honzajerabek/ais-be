import RBush from 'rbush'

interface ClientBox {
    minX: number
    minY: number
    maxX: number
    maxY: number
    client: WebSocket
}
