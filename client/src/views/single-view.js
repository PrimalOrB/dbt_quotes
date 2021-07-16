import React from "react";
import SingleQuote from '../components/single-quote'
import { Loading, NoteForm } from "../components";
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
    <>
      { data?.quote ?
        <>
        <SingleQuote quoteData={ quote }/>
        <NoteForm />
        </>
        :
        <Loading />
      }
    </>
  );
};

export default SingleView;
