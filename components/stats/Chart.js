import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getWorkTime from '../../auxiliarJS/getWorkTime';
import msToString from '../../auxiliarJS/msToString';
import style from './Chart.module.css'


export function Chart(props) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  /*export*/ const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Tiempo trabajado en la subtarea: ${props.name}`,
      },
    },
  };

  const labels = props.start_dates.map(sd => (new Date(sd)).toLocaleString());
  const dataTimes= getWorkTime(props.start_dates, props.pause_dates).map(d=>d/(1000*60));
  const totalTime='00:00:00'
  if(dataTimes.length!==0){
  
    totalTime=msToString(getWorkTime(props.start_dates, props.pause_dates).reduce((total,amount)=>total+amount))
  }
  
  /*export*/ const data = {
    labels,
    datasets: [
      {
        label: 'Tiempo Trabajado en min',
        data: dataTimes ,
        backgroundColor: '#E74C3C',
      },/*
      {
        label: 'periodo de interrupción',
        data: [7, 11, 16, 21, 26, 35, 45],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },*/
    ],
  };
  return (
    <div className={style['div-container']}>
      <p><b>Tiempo total de trabajo de la subtarea: {totalTime} </b></p>
      <div className={style['div-boundary']}>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
