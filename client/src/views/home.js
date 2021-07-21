import React from "react";

import { QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Archived = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter, currentStatusFilter } = state

  const active = dataStore.filter( (x) => {
    return x.status !== 'archived' && x.status !== 'production-ready'
  })

  let statusFiltered = active
  if( active.length > 0  && currentStatusFilter.name !== 'all' ){
    statusFiltered = currentStatusFilter.filter(active)
    console.log( statusFiltered )
  }

  return (
    <>
      <h1>Dashboard Content</h1>
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(statusFiltered) }/>
    </>
  )

};

export default Archived;
