// Pastaboss game server


//express js
	const express = require('express');
	const app = express();
	const server = require('http').Server(app);
	const port = process.env.PORT || 8080;

////express file system routing
 	app.use(express.static(__dirname + '/public'));
	app.get('/', (req, res)=> res.sendFile(__dirname + '/index.html'));

/////////server listen on port 
	server.listen(port, ()=> console.log(`Welcome to port ${port}.`)); 



