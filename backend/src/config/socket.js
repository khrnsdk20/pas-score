import { Server } from 'socket.io';

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? 'https://your-production-domain.com'
                : 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('🔌 Client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('🔌 Client disconnected:', socket.id);
        });
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
}
