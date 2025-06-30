// Importazione moduli
import express from 'express';
import cors from 'cors';
import responseHandler from './utils/responseHandler.js';
import dataRouter from './routers/data.router.js';
import { configDotenv } from 'dotenv';

// Configurazione file .env
configDotenv();

// Inizializzazione applicazione
const app = express();

// Middleware per cors
app.use(cors());
// Middleware per richieste in json
app.use(express.json());
// Middleware per richieste in url
app.use(express.urlencoded());

// Rotta per dati
app.use('/api/data', dataRouter);

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
app.listen(process.env.PORT, () =>
    console.log('Server avviato alla porta ', process.env.PORT)
);
