import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import {
  Chart as chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const misOptions = {
  scales: {
    y: {
      min: 0,
    },
    x: {
      ticks: {
        color: "",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const initialState = {
    fechaInicio: '',
    fechaFin: '',
    tipo: ''
}
export default function LinesChart( {infoLineChart, getInfoLineChart} ) {
  const [choiceRange, setChoiceRange] = useState(false);
  const [dateInfo, setDateInfo] = useState(initialState)
  const [values, setValues] = useState([])
  const [days, setDays] = useState([])

  const miData = {
    //cada una de las lineas del grafico
    labels: values,
    datasets: [
      {
        label: "Venta total",
        data: days,
        tension: 0.1,
        fill: true,
        borderColor: "rgb(60, 141, 187)",
        backgroundColor: "rgba(60, 141, 187, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(60, 141, 187, 0.5)",
        pointBackgroundColor: "rgba(60, 141, 187)",
      },
    ],
  };
  

  useEffect( () => {
    if(infoLineChart.length > 0){
      if(infoLineChart[0].mes){
        setValues( infoLineChart.map( value => value.mes));
      }else{
        setValues( infoLineChart.map( value => value.fecha));
      }
      setDays( infoLineChart.map( value => value.total));
    }else{
      setValues([])
      setDays([])
    }
  },[infoLineChart])

  const handleOnChange = (e) => {
    setDateInfo({...dateInfo, [e.target.name]: e.target.value})
  }

  const searchDate = () => {
    getInfoLineChart(dateInfo)
  }
  return (
    <div className="report-grafics__lines">
      <h5>
        <strong>Reporte de ventas</strong> <span>Datos del ultimo mes/año </span>{" "}
      </h5>
      <div className="report-grafics__btns">
        {choiceRange ? (
          <button
            className="btn-choice-range"
            onClick={() => setChoiceRange(!choiceRange)}
          >
            Ocultar Rango
          </button>
        ) : (
          <button
            className="btn-choice-range"
            onClick={() => setChoiceRange(!choiceRange)}
          >
            Elegir Rango
          </button>
        )}
        <select value={dateInfo.tipo} className="report-select" name="tipo" onChange={handleOnChange}>
          <option key='default' disabled >Elija una opcion</option>
          <option value='dia'>Diariamente</option>
          <option value='mes'>Mensual</option>
        </select> 
      </div>
      <Collapse in={choiceRange}>
        <div id="example-collapse-text">
          <div
            className="report__choice-range"
          >
            <input type="date" name='fechaInicio' onChange={handleOnChange} />
            <input type="date" name='fechaFin' onChange={handleOnChange} />
            <button onClick={searchDate} >Consultar</button>
          </div>
        </div>
      </Collapse>

      <div className="report-lines">
        <Line className="grafic-lines" data={miData} options={misOptions} />
      </div>
    </div>
  );
}
