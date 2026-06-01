import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ 
  port: 8081,
  clientTracking: true,
});

let gameState = {
    playerTurn : 0,
    board : [[' ',' ',' '],
             [' ',' ',' '],
             [' ',' ',' ']],

}

server.on('connection', (socket) => {
    //size should never be 0 on connection
    const uid = server.clients.size == 1? -1 : 1;
    if(server.clients.size >= 2){
        gameState.playerTurn = -1;
    }
    console.log('Client connected, sendingstate');
    //update each client on new connection
    socket.send(JSON.stringify({...gameState,player: uid}));
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
        console.log('Client disconnected');
    });

    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8081');