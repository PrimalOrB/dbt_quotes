import React from "react";

import { QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Archived = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter, stringFilter } = state

  const archived = dataStore.filter( x => x.status === 'archived')

  let stringFiltered
  if( stringFilter !== '' ){ 
   stringFiltered = archived.filter( x => {
     return ( 
       x.customerName.toLowerCase().includes(stringFilter.toLowerCase()) ||
       x.description.toLowerCase().includes(stringFilter.toLowerCase()) ||
       ( x.additionalNotes && x.additionalNotes.toLowerCase().includes(stringFilter.toLowerCase()) ) ||
       ( x.jNum && x.jNum.toLowerCase().includes(stringFilter.toLowerCase().replace('j','')) )
       )
   })
 } else {
   stringFiltered = archived
 }

  return (
    <>
      <h1>Archived</h1>
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(stringFiltered) }/>
    </>
  )

};

export default Archived;
