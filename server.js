
import {createServer} from 'node:http';
import express from 'express';
import { Server as SocketServer } from 'socket.io';

const app = express(); // <-- Création d'une application Express
const server = createServer(app); // <-- Utilisation de l'application Express
const io = new SocketServer(server); // <-- Création d'un serveur WebSocket

// Configuration de l'application Express
app.use(express.static('public')); // <-- Serveur de fichiers statiques

app.get('/', (req, res) => {
	res.redirect('/index.html'); // <-- Redirection vers la page d'accueil
});

server.listen(3000, () => { // <-- Démarrage du serveur
	console.log('Server is running on port 3000');
});

// Exemple de serveur Express avec un serveur HTTP


//////////////////////////////

io.on('connection', (socket) => {
	console.log(`Someone connected: ${socket.conn.remoteAddress}`);

	io.emit('system_message' , {
		content : `welcome to ${socket.conn.remoteAddress}`
	});

	socket.on('user_message_send' , (data) => {
		console.log(`Message: ${data.content}`);
		//renvoyer a tout ke monde

		io.emit('user_message', {
			content: data.content,
			author: socket.conn.remoteAddress,
			time: new Date().toLocaleTimeString(),
			isMe: false
		});
	});

	io.emit("typing_start",() => {
	typingUsers.delete(socket.conn.remoteAddress);
	io.emit('typing' , Array.from(typingUsers));
	});
     
	io.emit("typing_stop",() => {
		typingUsers.delete(socket.conn.remoteAddress);
		io.emit('typing' , Array.from(typingUsers));
		});
	

socket.on('disconnect', () => {
		console.log(`User disconnected ${socket.conn.remoteAddress} `);
	});


});


	



