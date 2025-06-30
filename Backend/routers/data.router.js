// Importazione moduli
import { Router } from 'express';
import {
    getData,
    postData,
    patchData,
    deleteData,
} from '../controllers/data.controller.js';

// Inizializzazione router
const router = Router();

// Rotte per richiesta, creazione, modifica ed eliminazione dei dati
router
    .get('/', getData)
    .post('/', postData)
    .patch('/', patchData)
    .delete('/', deleteData);

// Esportazione router
export default router;
