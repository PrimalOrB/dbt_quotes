import React from "react";

import { QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Archived = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter, currentStatusFilter, stringFilter } = state

  const active = dataStore.filter( (x) => {
    return x.status !== 'archived' && x.status !== 'production-ready'
  })

  let statusFiltered = active
  if( active.length > 0  && currentStatusFilter.name !== 'all' ){
    statusFiltered = currentStatusFilter.filter(active)
  }

  let stringFiltered
   if( stringFilter !== '' ){ 
    stringFiltered = statusFiltered.filter( x => {
      return ( 
        x.customerName.toLowerCase().includes(stringFilter.toLowerCase()) ||
        x.description.toLowerCase().includes(stringFilter.toLowerCase()) ||
        ( x.additionalNotes && x.additionalNotes.toLowerCase().includes(stringFilter.toLowerCase()) ) ||
        ( x.jNum && x.jNum.toLowerCase().includes(stringFilter.toLowerCase().replace('j','')) )
        )
    })
  } else {
    stringFiltered = statusFiltered
  }
  

  return (
    <>
      <h1>Task To Do</h1>
      <a href="https://dbt-engineering.herokuapp.com/quotes"><p>Quote Tracker has been moved to DBT Engineering Tools. Click To Forward</p></a>
      {/* <Filter/> */}
      {/* <QuoteList quotes={ currentFilter.filter(stringFiltered) }/> */}
    </>
  )

};

export default Archived;
