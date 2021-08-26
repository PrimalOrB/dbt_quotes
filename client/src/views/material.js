import React from "react";

import { QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Material = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter, stringFilter } = state

  const materials = dataStore.filter( x => { 
    return x.statusMtl === 'need-order' || x.statusMtl === 'ordered' || x.statusMtl === 'ordered-confirmed'
   } )  

  let stringFiltered
  if( stringFilter !== '' ){ 
   stringFiltered = materials.filter( x => {
     return ( 
       x.customerName.toLowerCase().includes(stringFilter.toLowerCase()) ||
       x.description.toLowerCase().includes(stringFilter.toLowerCase()) ||
       ( x.additionalNotes && x.additionalNotes.toLowerCase().includes(stringFilter.toLowerCase()) ) ||
       ( x.jNum && x.jNum.toLowerCase().includes(stringFilter.toLowerCase().replace('j','')) )
       )
   })
 } else {
   stringFiltered = materials
 }

  return (
    <>
      <h1>Material Ordering</h1>
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(stringFiltered) }/>
    </>
  )

};

export default Material;
