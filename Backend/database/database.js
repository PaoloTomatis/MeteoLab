// Importazione moduli
import { createPool } from 'mysql2';
import { configDotenv } from 'dotenv';

// Configurazione file .env
configDotenv();

// Creazione connessione al database
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}).promise();

// Esportazione connessione al database
export default pool;
