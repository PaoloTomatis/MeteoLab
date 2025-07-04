// Importazione funzioni
import pool from '../database/database.js';
import responseHandler from '../utils/responseHandler.js';

// Funzione per richiedere i dati
const getData = async (req, res) => {
    // Gestione errori
    try {
        // Richiesta dati
        const [[data]] = await pool.query('SELECT * FROM data ORDER BY date DESC LIMIT 1;');

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Dati richiesti correttamente!',
            data
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio errore all'utente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per creare i dati
const postData = async (req, res) => {
    // Gestione errori
    try {
        // Ricevimento dati
        const { temperature, humidity } = req.body ? req.body.data : {};

        // Controllo dati
        if (!temperature || isNaN(temperature) || !humidity || isNaN(humidity))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Creazione dati
        await pool.query(
            'INSERT INTO data (temperature, humidity) VALUES (?, ?)',
            [temperature, humidity]
        );

        // Invio risposta finale
        return responseHandler(res, 200, true, 'Dati creati correttamente!');
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio errore all'utente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per creare i dati
const patchData = async (req, res) => {
    // Gestione errori
    try {
        // Ricevimento dati
        const { id } = req.body ? req.body.where : {};
        const { temperature, humidity } = req.body ? req.body.data : {};

        // Liste per creazione query
        const fields = [];
        const values = [];

        if (temperature && !isNaN(temperature)) {
            fields.push('temperature = ?');
            values.push(temperature);
        }

        if (humidity && !isNaN(humidity)) {
            fields.push('humidity = ?');
            values.push(humidity);
        }

        // Controllo dati
        if (values.length <= 0)
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Aggiungo id ai valori
        values.push(id);

        // Modifica dati
        await pool.query(
            `UPDATE data SET ${fields.join(', ')} WHERE id = ?`,
            values
        );

        // Invio risposta finale
        return responseHandler(
            res,
            200,
            true,
            'Dati modificati correttamente!'
        );
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio errore all'utente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Funzione per eliminare i dati
const deleteData = async (req, res) => {
    // Gestione errori
    try {
        // Ricevimento dati
        const { id } = req ? req.params : {};

        // Controllo dati
        if (!id || isNaN(id))
            return responseHandler(
                res,
                400,
                false,
                'Dati mancanti o invalidi!'
            );

        // Eliminazione dati
        await pool.query(`DELETE FROM data WHERE id = ?`, [id]);

        // Invio risposta finale
        return responseHandler(res, 200, true, 'Dati eliminati correttamente!');
    } catch (error) {
        // Invio errore alla console
        console.error(error);
        // Invio errore all'utente
        return responseHandler(res, 500, false, 'Errore interno del server!');
    }
};

// Esportazione funzioni
export { getData, postData, patchData, deleteData };
