// Importazione moduli
import react, { useEffect, useState } from 'react';
import Data from './Data.jsx';

// Componente app
const App = () => {
    // Stati di gestione
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // Stati di dati
    const [data, setData] = useState(null);

    // Caricamento dati
    useEffect(() => {
        // Funzione per richiedere i dati
        const getData = async () => {
            // Gestione errori
            try {
                // Chiamata al backend
                let call = await fetch(
                    `${import.meta.env.VITE_URL_BACKEND}/api/data`,
                    {
                        method: 'GET',
                    }
                );

                // Conversione dati
                call = await call.json();

                // Controllo successo della chiamata
                if (call.success) {
                    // Impostazione dati
                    setData(call.data);
                } else {
                    // Invio errore
                    throw Error(call.message);
                }
            } catch (error) {
                // Impostazione errore
                setError(error.message);
            } finally {
                // Rimozione caricamento
                setLoading(false);
            }
        };

        getData();

        setInterval(getData, 5000);
    }, []);

    // Rendering componenti
    return (
        <>
            {loading || error ? (
                <p>{loading ? 'Caricamento...' : error}</p>
            ) : (
                <>
                    <Data data={data.temperature} type={'temp'} />
                    <Data data={data.humidity} type={'hum'} />
                </>
            )}
        </>
    );
};

// Esportazione componente
export default App;
