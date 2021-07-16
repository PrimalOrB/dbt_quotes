import React from "react";
import SingleQuote from '../components/single-quote'
import { QUERY_QUOTE } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const SingleView = () => {

  const { id: _id } = useParams();

  const { loading, data } = useQuery(QUERY_QUOTE,{
    variables: { id: _id }
  });

  const quote = data?.quote || []

  return (
    <div>
      <SingleQuote quoteData={ quote }/>
    </div>
  );
};

export default SingleView;
