// Importazione moduli
import { useEffect, useState } from 'react';
import Data from './Data.jsx';
import { LineChart, XAxis, YAxis, Line } from 'recharts';

// Componente app
const App = () => {
    // Stati di gestione
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // Stati di dati
    const [data, setData] = useState(null);
    const [datalist, setDatalist] = useState([]);

    // Caricamento dati
    useEffect(() => {
        // Creazione connessione websocket
        const socket = new WebSocket('ws://localhost:3000');

        // Ricezione dati
        socket.onmessage = (event) => {
            // Creazione dati
            const currentData = JSON.parse(event.data ? event.data : null);
            // Impostazione dati
            setData(currentData);
            setDatalist((prevList) => {
                const newList = [
                    ...prevList,
                    {
                        date: currentData.date,
                        temperature: currentData.temperature,
                        humidity: currentData.humidity,
                        light: currentData.light,
                    },
                ];
                // Controllo lunghezza lista
                if (newList.length > 100) {
                    newList.shift();
                }
                return newList;
            });

            // Disattivazione caricamento
            setLoading(false);
        };
        // Ricezione errori
        socket.onerror = (event) => {
            // Impostazione errore
            setError(event.error);
            // Disattivazione caricamento
            setLoading(false);
        };

        // Chiusura connessione
        return () => {
            socket.close();
        };
    }, []);

    // Rendering componenti
    return (
        <>
            {loading || error ? (
                <p>{loading ? 'Caricamento...' : error}</p>
            ) : (
                <>
                    <Data
                        name={'temperatura'}
                        data={data ? data.temperature : '-'}
                        type={'temp'}
                    />
                    <Data
                        name={'umidità'}
                        data={data ? data.humidity : '-'}
                        type={'perc'}
                    />
                    <Data
                        name={'luminosità'}
                        data={data ? data.light : '-'}
                        type={'perc'}
                    />
                    <Data
                        name={'data'}
                        data={data ? data.date : '-'}
                        type={null}
                    />
                    <LineChart width={400} height={300} data={datalist}>
                        <XAxis dataKey="date" tick={false} />
                        <YAxis domain={[0, 100]} />
                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#8884d8"
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                    <LineChart width={400} height={300} data={datalist}>
                        <XAxis dataKey="date" tick={false} />
                        <YAxis domain={[0, 100]} />
                        <Line
                            type="monotone"
                            dataKey="humidity"
                            stroke="#8884d8"
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                    <LineChart width={400} height={300} data={datalist}>
                        <XAxis dataKey="date" tick={false} />
                        <YAxis domain={[0, 100]} />
                        <Line
                            type="monotone"
                            dataKey="light"
                            stroke="#8884d8"
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </>
            )}
        </>
    );
};

// Esportazione componente
export default App;
