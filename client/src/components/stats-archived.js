import React from "react";
import { Line } from 'react-chartjs-2';
import { calc_parse_average, calc_days_between } from '../utils/helpers'
import { useStoreContext } from "../utils/GlobalState";

const StatsArchived = ( ) => {


    const [state] = useStoreContext();
    const { dataStore } = state

    // const [ processingData, setProcessingData ] = useState( false )

        let maxDuration = 0
        const archivedQuotes = dataStore.filter( quote => quote.completedDate > 0 )

        let newPriority1 = []
        let newPriority2 = []
        let newPriority3 = []
        let newPriority4 = []
        let newPriority5 = []
        let newPriorityNull = []
        let newPriorityTotal = []
        for( var h = 0; h < archivedQuotes.length; h++ ){
            archivedQuotes[h].priority === '1' && newPriority1.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '2' && newPriority2.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '3' && newPriority3.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '4' && newPriority4.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === '5' && newPriority5.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            archivedQuotes[h].priority === null && newPriorityNull.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            newPriorityTotal.push( calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) )
            maxDuration = calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) > maxDuration ? calc_days_between( archivedQuotes[h].createdAt, archivedQuotes[h].completedDate ) : maxDuration
        }
        let priority1 =[]
        let priority2 =[]
        let priority3 =[]
        let priority4 =[]
        let priority5 =[]
        let priorityNull =[]
        let priorityTotal = []
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
        if( newPriorityTotal.length > 0 ) {
            priorityTotal.push( { x: newPriorityTotal.sort((a, b) => b - a)[0], y: 7 } )
            priorityTotal.push( { x: newPriorityTotal.reduce((a, b) => a + b, 0) / newPriorityTotal.length, y: 7 } )
            priorityTotal.push( { x: newPriorityTotal.sort((a, b) => a - b)[0], y: 7 } )
        }  

        // useEffect(()=>{
        //     setProcessingData( true )  
        // },[ newPriorityTotal ] )


        const data = {
            datasets: [
                {
                label: 'Priority 1',
                data: priority1,
                fill: false,
                backgroundColor: 'rgb(102, 255, 0)',
                borderColor: 'rgba(102, 255, 0, 0.5)',
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
                {
                label: 'Priority 2',
                data: priority2,
                fill: false,
                backgroundColor: 'rgb(204, 255, 0)',
                borderColor: 'rgba(204, 255, 0, 0.5)',
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
                {
                label: 'Priority 3',
                data: priority3,
                fill: false,
                backgroundColor: 'rgb(255, 204, 0)',
                borderColor: 'rgba(255, 204, 0, 0.5)',
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
                {
                label: 'Priority 4',
                data: priority4,
                fill: false,
                backgroundColor: 'rgb(255, 102, 0)',
                borderColor: 'rgba(255, 102, 0, 0.5)',
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
                {
                label: 'Priority 5',
                data: priority5,
                fill: false,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0, 0.5)',
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
                {
                label: 'No Priority',
                data: priorityNull,
                fill: false,
                backgroundColor: 'rgb(180, 180, 180)',
                borderColor: 'rgba(180, 180, 180, 0.5)',
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
                {
                label: 'Total Tasks',
                data: priorityTotal,
                pointBorderColor : ['rgb(255, 0, 0)','rgb(245, 124, 0)','rgb(0, 255, 0)'],
                fill: false,
                backgroundColor: 'rgba(245, 124, 0,0.05)',
                borderColor: 'rgba(245, 124, 0, 0.2)',
                borderCapStyle: 'butt',
                borderWidth: 50,
                pointStyle: "line",
                hoverBorderWidth: 50,
                },
            ],
        };
        
        const options2= {  
            title: {
                display: true,
                text: 'Completed Task Duration ( days ), By Priority',
                fontSize: 24
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    type:'linear',
                    ticks: {
                        beginAtZero: true,
                        reverse: true,
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        max: 8,
                        display: false,
                        reverse: true,
                    }
                }]
            },
        }

        // if( !processingData ){
        //     return (
        //         <h2>Loading</h2>
        //     )
        // }

        return (
        <>
            <Line data={ data } options={ options2 } />
            <div className={ 'statsCont' }>
            <h3>Distribution of completed task (days), By Priority</h3>
            { calc_parse_average( data.datasets[0].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>Priorty 1:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[0].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[0].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[0].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriority1.length }` }</p>
                </div>
                </span>
            }
            { calc_parse_average( data.datasets[1].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>Priorty 2:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[1].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[1].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[1].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriority2.length }` }</p>
                </div>
                </span>
            }
            { calc_parse_average( data.datasets[2].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>Priorty 3:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[2].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[2].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[2].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriority3.length }` }</p>
                </div>
                </span>
            }
            { calc_parse_average( data.datasets[3].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>Priorty 4:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[3].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[3].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[3].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriority4.length }` }</p>
                </div>
                </span>
            }
            { calc_parse_average( data.datasets[4].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>Priorty 5:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[4].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[4].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[4].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriority5.length }` }</p>
                </div>
                </span>
            }
            { calc_parse_average( data.datasets[5].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>No Priority:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[5].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[5].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[5].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriorityNull.length }` }</p>
                </div>
                </span>
            }
            { calc_parse_average( data.datasets[6].data ) > 0 && 
                <span className={ 'priorityRate' }>
                <p className={ 'statsTitle underline' }>Total Tasks:</p>
                <div className="priorityLabelHolder">
                    <p className="priorityLabel"><b>min: </b>{ `${ data.datasets[6].data[2].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>avg: </b>{ `${ data.datasets[6].data[1].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>max: </b>{ `${ data.datasets[6].data[0].x.toFixed(1) }` }</p>
                    <p className="priorityLabel"><b>num: </b>{ `${ newPriorityTotal.length }` }</p>
                </div>
                </span>
            }
            </div>
        </>
        )
};

export default StatsArchived;
