import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ 
  port: 8081 
});

const clients = new Set();



server.on('connection', (socket) => {
    clients.add(socket);
    console.log('Client connected');
    socket.on('message', (message, isBinary) => {
        console.log(`Received: ${message}`);
        clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message, {binary: isBinary});
            }
        });
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