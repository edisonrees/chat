// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', function connection(ws) {
  clients.add(ws);
  
  ws.on('message', function incoming(message) {
    // Broadcast received message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function () {
    clients.delete(ws);
  });
});

server.listen(3000, function () {
  console.log('Server listening on port 3000');
});
