import { Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js'
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';


/* const data = {
    labels: ['charque', 'pique', 'conejo', 'almuerzo', 'Coca'],
    datasets: [
        {
            label: 'Platos mas vendidos',
            data: [ 12,45,12,45,25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75,192,192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75,192,192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
            ],
            borderWidth: 1,
        }
    ]
} */


export default function Pies( {infoPieChart} ){
    
    const [data, setData] = useState([])
    const [labels, setLabels] = useState([])

    useEffect( () => {
        if(infoPieChart.length > 0){
            setData( infoPieChart.map( data => data.cantidad));
            setLabels(infoPieChart.map( data => data.nombre))
        }
    },[infoPieChart])


    ChartJs.register(
        ArcElement, Tooltip, Legend
    );
    
    

    const dataPie = {
        labels: labels,
        datasets: [
            {
                label: 'Platos mas vendidos',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75,192,192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75,192,192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderWidth: 1,
            }
        ]
    }
    
    const options = {
        responsive: true,
        legend: {
            position: 'bottom'
        },
        maintainAspectRatio: false,
        plugins:{
            datalabels: {
                color: '#000',
                display: true,
                 anchor: 'end',
                 align: 'start',
                 borderWidth: 2,
                 borderColor: 'white',
                 borderRadius: 25,
                 offset: -10
            }
        }
    }
    

    return(
        <div className='report-grafics__pies'>
            <h5>Productos mas vendidos</h5>
            <div className='report-pies'>
              <Pie data={dataPie} options={options} plugins={[ChartDataLabels]}/>
            </div>
        </div>
    ) 
}