import React, { Fragment } from "react";

import { HomeContent, QuoteList } from "../components";
import { useQuery } from '@apollo/client';
import { QUERY_QUOTES } from '../utils/queries';

const Home = () => {

  const { loading, data } = useQuery(QUERY_QUOTES);

  const quotes = data?.quotes || []

  return (
    <Fragment>
      <HomeContent />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        <QuoteList quotes={ quotes }/>
        </>
      )}
    </Fragment>
  )

};

export default Home;
