import React from "react";
import SingleQuote from '../components/single-quote'
import { Loading, NoteForm, Note } from "../components";
import { QUERY_QUOTE } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


const SingleView = (  ) => {

  const { id: _id } = useParams();

  const { loading, data } = useQuery(QUERY_QUOTE,{
    variables: { id: _id }
  });

  const quote = data?.quote || []

  return (
    <>
    {loading ? (
        <Loading />
      ) : (
        <>
        <SingleQuote quoteData={ quote }/>
        { quote.notes.map( ( note ) => {
          return <Note key={ note._id} noteData={ note }/>
          // console.log( note )
        // return <Note />
        } )}
        <NoteForm quoteId={ { id: _id }.id }/>
        </>
      )}  
    </>
  );
};

export default SingleView;
