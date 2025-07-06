// Componente data
const Data = ({ data, name, type }) => {
    return (
        <div className="data">
            <h3>
                {`${name.toUpperCase()} : `}
                {data}
                {type == 'perc' ? '%' : ''}
                {type == 'temp' ? '°C' : ''}
            </h3>
        </div>
    );
};

// Esportazione componente
export default Data;
