import React, { Fragment, useState } from "react";

import { HomeContent, QuoteList, Filter, Loading } from "../components";
import { useQuery } from '@apollo/client';
import { QUERY_QUOTES } from '../utils/queries';

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

  const { loading, data } = useQuery(QUERY_QUOTES,{
    variables: { 
      filterPO: filterState.filterPO,
      filterPriority: filterState.filterPriority,
      filterDate: filterState.filterDate
     }
  });

  const quotes = data?.quotes || []

  return (
    <Fragment>
      <HomeContent />
      {loading ? (
        <Loading />
      ) : (
        <>
        <Filter filterState={ filterState } setFilterState={ setFilterState } handleChange={ handleChange }/>
        <QuoteList quotes={ quotes }/>
        </>
      )}
    </Fragment>
  )

};

export default Home;
