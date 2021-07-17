import React from "react";

import { HomeContent, QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Archived = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter } = state

  const active = dataStore.filter( (x) => {
    return x.status !== 'archived' && x.status !== 'production-ready'
  })

  return (
    <>
      <HomeContent />
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(active) }/>
    </>
  )

};

export default Archived;
