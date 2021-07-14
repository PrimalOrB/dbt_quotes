import React, { Fragment, useState } from "react";

import { HomeContent, QuoteList, Filter } from "../components";
import { useQuery } from '@apollo/client';
import { QUERY_QUOTES } from '../utils/queries';

const Home = () => {

  const [filterState, setFilterState] = useState({
    'filterPO': false,
    'filterPriority': false,
    'filterDate':false
  })
  console.log( filterState )

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const val = type === 'checkbox' ? checked: value

    setFilterState({
      ...filterState,
      [name]: val,
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
        <div>Loading...</div>
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
