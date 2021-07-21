import React from "react";

import { QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Archived = () => {

  const [state] = useStoreContext();
  const { dataStore, currentFilter } = state

  const archived = dataStore.filter( x => x.status === 'archived')

  return (
    <>
      <h1>Dashboard Content</h1>
      <Filter/>
      <QuoteList quotes={ currentFilter.filter(archived) }/>
    </>
  )

};

export default Archived;
