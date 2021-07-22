import React from "react";
import { Line } from 'react-chartjs-2';
import { useStoreContext } from "../utils/GlobalState";
import { calc_color_scale, calc_parse_average } from '../utils/helpers'
import moment from 'moment'

const Stats = () => {

  const [state] = useStoreContext();
  const { dataStore } = state
  
  if( dataStore.length ){

    const activeQuotes = dataStore.filter( quote => ( quote.status !== 'archived' && quote.status !== 'hold' ) ).sort( ( a, b ) => a.createdAt - b.createdAt)
    const oldestDate = moment( new Date( Number( activeQuotes[0].createdAt ) ) )
    const today = moment( new Date() )
    const dayRange =( today.diff( oldestDate, "days" ) )

    const dateData = {}

    for ( var i = 0; i < dayRange + 2; i++){
      dateData[ moment( oldestDate ).add( i, "days" ).format("M/DD/YYYY") ] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, null: 0, total: 0}
    }  
    
    for( var j = 0; j < activeQuotes.length; j++){
      dateData[ moment( new Date( Number( activeQuotes[j].createdAt ) ) ).format("M/DD/YYYY") ][activeQuotes[j].priority] = dateData[ moment( new Date( Number( activeQuotes[j].createdAt ) ) ).format("M/DD/YYYY") ][activeQuotes[j].priority] + 1
      dateData[ moment( new Date( Number( activeQuotes[j].createdAt ) ) ).format("M/DD/YYYY") ].total = dateData[ moment( new Date( Number( activeQuotes[j].createdAt ) ) ).format("M/DD/YYYY") ].total + 1
    }
    const totalTasks = [] 
    const dateLabels = []
    const priority1 = []
    const priority2 = []
    const priority3 = []
    const priority4 = []
    const priority5 = []
    const priorityNull = []
  
    for (const [key, value] of Object.entries( dateData )) {
      totalTasks.push( { x: moment( key ).format("M/DD/YYYY") ,y: value.total } )
      priority1.push( { x: moment( key ).format("M/DD/YYYY") ,y: value[1] } )
      priority2.push( { x: moment( key ).format("M/DD/YYYY") ,y: value[2] } )
      priority3.push( { x: moment( key ).format("M/DD/YYYY") ,y: value[3] } )
      priority4.push( { x: moment( key ).format("M/DD/YYYY") ,y: value[4] } )
      priority5.push( { x: moment( key ).format("M/DD/YYYY") ,y: value[5] } )
      priorityNull.push( { x: moment( key ).format("M/DD/YYYY") ,y: value[null] } )
      dateLabels.push( key )
    }
    
    const data = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Priority 1',
          data: priority1,
          fill: false,
          backgroundColor: 'rgb(102, 255, 0)',
          borderColor: 'rgba(102, 255, 0, 0.5)',
        },
        {
          label: 'Priority 2',
          data: priority2,
          fill: false,
          backgroundColor: 'rgb(204, 255, 0)',
          borderColor: 'rgba(204, 255, 0, 0.5)',
        },
        {
          label: 'Priority 3',
          data: priority3,
          fill: false,
          backgroundColor: 'rgb(255, 204, 0)',
          borderColor: 'rgba(255, 204, 0, 0.5)',
        },
        {
          label: 'Priority 4',
          data: priority4,
          fill: false,
          backgroundColor: 'rgb(255, 102, 0)',
          borderColor: 'rgba(255, 102, 0, 0.5)',
        },
        {
          label: 'Priority 5',
          data: priority4,
          fill: false,
          backgroundColor: 'rgb(255, 0, 0)',
          borderColor: 'rgba(255, 0, 0, 0.5)',
        },
        {
          label: 'No Priority',
          data: priorityNull,
          fill: false,
          backgroundColor: 'rgb(180, 180, 180)',
          borderColor: 'rgba(180, 180, 180, 0.5)',
        },
        {
          label: 'Total Tasks',
          data: totalTasks,
          fill: true,
          backgroundColor: 'rgba(245, 124, 0,0.1)',
          borderColor: 'rgba(245, 124, 0, 0.5)',
        },
      ],
    };
    
    const options = {
      plugins: {
        title: {
            display: true,
            text: 'Active Tasks ( Not Archived & Not On Hold ), By Date'
        }
      },
      legend: {
          display: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          type: "time",
          time: {
              unit: 'week',
              displayFormats: {
                  'millisecond': 'MMM DD',
                  'second': 'MMM DD',
                  'minute': 'MMM DD',
                  'hour': 'MMM DD',
                  'day': 'MMM DD',
                  'week': 'MMM DD',
                  'month': 'MMM DD',
                  'quarter': 'MMM DD',
                  'year': 'MMM DD',
              }
          },
          ticks: {
              fontSize: 9,
              maxRotation: 45,
              minRotation: 45
          }
        }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    console.log( data.datasets)
  
    return (
      <>
        <h1>Stats</h1>
  
        <Line data={ data } options={ options } />
        <div className={ 'statsCont' }>
          <h3>Average Duration ( days ), By Priority</h3>
          { calc_parse_average( data.datasets[0].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>Priorty 1:</p>
              <p>{ `${ calc_parse_average( data.datasets[0].data ) }` }</p>
            </span>
          }
          { calc_parse_average( data.datasets[1].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>Priorty 2:</p>
              <p>{ `${ calc_parse_average( data.datasets[1].data ) }` }</p>
            </span>
          }
          { calc_parse_average( data.datasets[2].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>Priorty 3:</p>
              <p>{ `${ calc_parse_average( data.datasets[2].data ) }` }</p>
            </span>
          }
          { calc_parse_average( data.datasets[3].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>Priorty 4:</p>
              <p>{ `${ calc_parse_average( data.datasets[3].data ) }` }</p>
            </span>
          }
          { calc_parse_average( data.datasets[4].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>Priorty 5:</p>
              <p>{ `${ calc_parse_average( data.datasets[4].data ) }` }</p>
            </span>
          }
          { calc_parse_average( data.datasets[5].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>No Priority:</p>
              <p>{ `${ calc_parse_average( data.datasets[5].data ) }` }</p>
            </span>
          }
          { calc_parse_average( data.datasets[6].data ) > 0 && 
            <span className={ 'priorityRate' }>
              <p className={ 'statsTitle' }>Total Tasks:</p>
              <p>{ `${ calc_parse_average( data.datasets[6].data ) }` }</p>
            </span>
          }
        </div>

  
        {/* <ul>
          { dataStore.map((x) => {
            return <li key={ x._id } >
              <p>{ x.customerName } - { x.jNum }: started:{ format_date( x.createdAt ) }, completed:{ x.completedDate ? format_date( x.completedDate ) : 'false' }, duration: { x.completedDate !== null ? calc_days_between( x.completedDate, x.createdAt) : calc_days_to_current( x.createdAt ).diff  }</p>
            </li>
          })}
        </ul> */}
      </>
    )
  }

};

export default Stats;
