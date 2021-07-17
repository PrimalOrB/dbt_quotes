import React from "react";

import { HomeContent, QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Archived = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter } = state

  const archived = dataStore.filter( x => x.status === 'archived')

  return (
    <>
      <HomeContent />
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(archived) }/>
    </>
  )

};

export default Archived;
