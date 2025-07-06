// Importazione moduli
import { Router } from 'express';
import {
    postData,
    patchData,
    deleteData,
} from '../controllers/data.controller.js';

// Inizializzazione router
const router = Router();

// Rotte per richiesta, creazione, modifica ed eliminazione dei dati
router.post('/', postData).patch('/', patchData).delete('/', deleteData);

// Esportazione router
export default router;
