import React, { Fragment, useState } from "react";

import { HomeContent, QuoteList, Filter } from "../components";
import { useStoreContext } from "../utils/GlobalState";

const Home = () => {

  const initialState = {
    'filterPO': false,
    'filterPriority': false,
    'filterDate':false
  }

  const [filterState, setFilterState] = useState( initialState )

  const handleChange = (event) => {
    setFilterState({
      ...initialState,
      [event.target.id]: !filterState[event.target.id],
    });
  };

  const [state] = useStoreContext();
  const { dataStore, currentFilter } = state

  return (
    <>
      <HomeContent />
      <Filter filterState={ filterState } setFilterState={ setFilterState } handleChange={ handleChange }/>
      <QuoteList quotes={ currentFilter.filter(dataStore) }/>
    </>
  )

};

export default Home;
