import React from "react";
import { Line } from 'react-chartjs-2';
import { calc_color_scale, calc_parse_average, calc_days_between } from '../utils/helpers'
import { useStoreContext } from "../utils/GlobalState";
import moment from 'moment'

const StatsArchived = ( ) => {

    const [state] = useStoreContext();
    const { dataStore } = state
  
    if( dataStore.length ){

        const archivedQuotes = dataStore.filter( quote => quote.completedDate > 0 )
        let newPriority1 = []
        let newPriority2 = []
        let newPriority3 = []
        let newPriority4 = []
        let newPriority5 = []
        let newPriorityNull = []
        for( var h = 0; h < archivedQuotes.length; h++ ){
            archivedQuotes[h].priority === '1' && newPriority1.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '2' && newPriority2.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '3' && newPriority3.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '4' && newPriority4.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '5' && newPriority5.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === null && newPriorityNull.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
        }
        let priority1 =[]
        let priority2 =[]
        let priority3 =[]
        let priority4 =[]
        let priority5 =[]
        let priorityNull =[]
        if( newPriority1.length > 0 ) { 
            priority1.push( { x: newPriority1.sort((a, b) => b - a)[0], y: 1 } )
            priority1.push( { x: newPriority1.reduce((a, b) => a + b, 0) / newPriority1.length, y: 1 } )
            priority1.push( { x: newPriority1.sort((a, b) => a - b)[0], y: 1 } )
        }
        if( newPriority2.length > 0 ) { 
            priority2.push( { x: newPriority2.sort((a, b) => b - a)[0], y:2  } )
            priority2.push( { x: newPriority2.reduce((a, b) => a + b, 0) / newPriority2.length, y:2  } )
            priority2.push( { x: newPriority2.sort((a, b) => a - b)[0], y: 2 } )
        }
        if( newPriority3.length > 0 ) {
            priority3.push( { x: newPriority3.sort((a, b) => b - a)[0], y: 3 } )
            priority3.push( { x: newPriority3.reduce((a, b) => a + b, 0) / newPriority3.length, y: 3 } )
            priority3.push( { x: newPriority3.sort((a, b) => a - b)[0], y: 3 } )
        }        
        if( newPriority4.length > 0 ) {
            priority4.push( { x: newPriority4.sort((a, b) => b - a)[0], y: 4 } )
            priority4.push( { x: newPriority4.reduce((a, b) => a + b, 0) / newPriority4.length, y: 4 } )
            priority4.push( { x: newPriority4.sort((a, b) => a - b)[0], y: 4 } )
        }  
        if( newPriority5.length > 0 ) {
            priority5.push( { x: newPriority5.sort((a, b) => b - a)[0], y: 5 } )
            priority5.push( { x: newPriority5.reduce((a, b) => a + b, 0) / newPriority5.length, y: 5 } )
            priority5.push( { x: newPriority5.sort((a, b) => a - b)[0], y: 5 } )
        }  
        if( newPriorityNull.length > 0 ) {
            priorityNull.push( { x: newPriorityNull.sort((a, b) => b - a)[0], y: 6 } )
            priorityNull.push( { x: newPriorityNull.reduce((a, b) => a + b, 0) / newPriorityNull.length, y: 6 } )
            priorityNull.push( { x: newPriorityNull.sort((a, b) => a - b)[0], y: 6 } )
        }  

        console.log( priority1, priority2, priority3, priority4, priority5, priorityNull )
        const labels = [6,7,8,9]
            
        const data = {
        labels: labels,
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
            // {
            // label: 'Total Tasks',
            // data: totalTasks,
            // fill: true,
            // backgroundColor: 'rgba(245, 124, 0,0.05)',
            // borderColor: 'rgba(245, 124, 0, 0.2)',
            // borderDash: [10,10]
            // },
        ],
        };
        
        
        // const options = {
        //     plugins: {
        //         title: {
        //             display: true,
        //             text: 'Completed Task Duration ( days ), By Priority'
        //         }
        //     },
        //     legend: {
        //         display: false
        //     },
        //     responsive: true,
        //     scales: {
        //         xAxes: [{
        //         }],
        //         yAxes: [{
        //             id: 'A',
        //             type: 'linear',
        //             position: 'left',
        //           }, {
        //             id: 'B',
        //             type: 'linear',
        //             position: 'right',
        //             ticks: {
        //               max: 1,
        //               min: 0
        //             }
        //           }]
        //     },
        // };
    
        const options2= {  
            plugins: {
                    title: {
                        display: true,
                        text: 'Completed Task Duration ( days ), By Priority'
                    }
                },
            scales: {
                xAxes: [{
                    display: false,
                    type: 'linear',
                    ticks: {
                      reverse: false,
                
                      // forces step size to be 5 units
                      stepSize: 5 // <----- This prop sets the stepSize
                    }
                  }],
                yAxes: [{
                    display: false,
                    ticks: {
                        min: 0,
                        max: 6,
                        stepSize: 1,
                        precision: 0
                    }
                  }]
            }
        }

        return (
        <>
            <h1>Stats</h1>
    
            <Line data={ data } options={ options2 } />
        </>
        )
    }
};

export default StatsArchived;
