// Importazione moduli
import react from 'react';

// Componente data
const Data = ({ data, type }) => {
    return (
        <div className="data">
            <h3>
                {type == 'temp' ? 'TEMPERATURA: ' : "UMIDITA': "}
                {data}
                {type == 'temp' ? '°C' : '%'}
            </h3>
        </div>
    );
};

// Esportazione componente
export default Data;
