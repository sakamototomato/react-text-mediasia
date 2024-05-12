import { EventEmitter } from "events"

export enum EGameEvent {
    "planetCreated",
    "minerCreate",
    "minerStartToTravel",
    "minerEndWork",
    // TODO: to implement more events
}

class WS extends EventEmitter {
    socket: WebSocket
    constructor() {
        super()
        const socket = new WebSocket('ws://localhost:3000') // FIXME: Didn't found any available websocket in backend source codes
        socket.addEventListener('open', () => {
            console.log("ws connected")
        })
        socket.addEventListener('message', (e) => {
            console.log("message accepted", e.data)
            // websocket gives different types of events
            const eventType = e.data?.type
            // TODO: emit different events
            switch (eventType) {
                case EGameEvent.minerCreate:
                    this.emit(EGameEvent.minerCreate, e.data)
                    break;
                default: break;
            }
        })
        this.socket = socket

    }
}
export const ws = new WS()

