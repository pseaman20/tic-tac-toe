import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ 
  port: 8081,
  clientTracking: true,
});

const clients = new Set();

let gameState = {
    playerTurn : 0,
    board : [[' ',' ',' '],
             [' ',' ',' '],
             [' ',' ',' ']],

}

server.on('connection', (socket) => {
    console.log('Client connected, sendingstate');
    socket.send(JSON.stringify(gameState));
    socket.on('message', (data, isBinary) => {
        //only send out messages if data is changing
        if(JSON.stringify(data) !== JSON.stringify(gameState)){
            console.log(`Received: ${data}`);
            gameState = JSON.parse(data)
            server.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data, {binary: isBinary});
                }
            });
        }
    });

    socket.on('close', () => {
        clients.delete(socket)
        console.log('Client disconnected');
    });

    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8081');