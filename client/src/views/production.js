import React from "react";

import { HomeContent, QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Production = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter } = state

  const ready = dataStore.filter( x => x.status === 'production-ready')

  return (
    <>
      <HomeContent />
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(ready) }/>
    </>
  )

};

export default Production;
