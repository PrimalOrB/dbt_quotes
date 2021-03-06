import React from "react";

import { QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const QuoteReady = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter, stringFilter } = state

  const ready = dataStore.filter( x => x.status === 'quote-ready')

  let stringFiltered
  if( stringFilter !== '' ){ 
   stringFiltered = ready.filter( x => {
     return ( 
       x.customerName.toLowerCase().includes(stringFilter.toLowerCase()) ||
       x.description.toLowerCase().includes(stringFilter.toLowerCase()) ||
       ( x.additionalNotes && x.additionalNotes.toLowerCase().includes(stringFilter.toLowerCase()) ) ||
       ( x.jNum && x.jNum.toLowerCase().includes(stringFilter.toLowerCase().replace('j','')) )
       )
   })
 } else {
   stringFiltered = ready
 }

  return (
    <>
      <h1>Quote Ready</h1>
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(stringFiltered) }/>
    </>
  )

};

export default QuoteReady;
