import React from "react";
import { Line } from 'react-chartjs-2';
import { useStoreContext } from "../utils/GlobalState";
import { format_date, calc_days_between, calc_days_to_current } from "../utils/helpers";



const Stats = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter } = state

  const archived = dataStore.filter( x => x.status === 'archived')
  const dataTest = {}


  for( var i = 0; i < dataStore.length; i++){
    dataTest[format_date( dataStore[i].createdAt )] = dataTest[format_date( dataStore[i].createdAt )] !== undefined ? dataTest[format_date( dataStore[i].createdAt )] + 1 : 1
  }
  const chartData2 = []
  const labels = []

  for (const [key, value] of Object.entries(dataTest)) {
    chartData2.push( { x: new Date( key ) ,y: value })
    labels.push( key )
    console.log(`${key}: ${value}`);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Quantity Of Tasks By Date',
        data: chartData2,
        fill: false,
        backgroundColor: 'rgb(245, 124, 0)',
        borderColor: 'rgba(245, 124, 0, 0.5)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <h1>Stats</h1>

      <Line data={ data } options={ options } />

      {/* <ul>
        { dataStore.map((x) => {
          return <li key={ x._id } >
            <p>{ x.customerName } - { x.jNum }: started:{ format_date( x.createdAt ) }, completed:{ x.completedDate ? format_date( x.completedDate ) : 'false' }, duration: { x.completedDate !== null ? calc_days_between( x.completedDate, x.createdAt) : calc_days_to_current( x.createdAt ).diff  }</p>
          </li>
        })}
      </ul> */}
    </>
  )

};

export default Stats;
