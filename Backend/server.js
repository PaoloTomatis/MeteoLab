// Importazione moduli
import express from 'express';
import cors from 'cors';
import responseHandler from './utils/responseHandler.js';
import dataRouter from './routers/data.router.js';
import { configDotenv } from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';
import pool from './database/database.js';

// Configurazione file .env
configDotenv();

// Inizializzazione applicazione
const app = express();
const server = http.createServer(app);

// Creazione connessione websocket
const wss = new WebSocketServer({ server });

// Middleware per cors
app.use(cors());
// Middleware per richieste in json
app.use(express.json());
// Middleware per richieste in url
app.use(express.urlencoded());

// Rotta per dati
app.use('/api/data', dataRouter);

// Creazione lista di client
export const clients = [];

// Web Sockets
wss.on('connection', async (ws) => {
    clients.push(ws);

    // Richiesta dati
    const [[data]] = await pool.query(
        'SELECT * FROM data ORDER BY date DESC LIMIT 1;'
    );

    ws.send(JSON.stringify(data));
});

// Rotta per errori 404
app.use((req, res) => {
    return responseHandler(
        res,
        404,
        false,
        'Pagina non trovata o non esistente!'
    );
});

// Avvio dell'applicazione
server.listen(process.env.PORT, () =>
    console.log('Server avviato alla porta ', process.env.PORT)
);
