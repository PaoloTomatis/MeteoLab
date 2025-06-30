// Funzione per gestione risposte
const responseHandler = (
    res,
    code = 500,
    success = false,
    message = '',
    data = []
) => {
    return res.status(code).json({ success, message, data });
};

// Esportazione funzione
export default responseHandler;
