import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { useStoreContext } from "../utils/GlobalState";
import { ADD_NOTE } from '../utils/mutations';

const NoteForm = ( { quoteId } ) => {
    
    const [state] = useStoreContext();

    const [ noteFormState, setNoteFormState ] = useState('');
   
    const [ errorMessage, setErrorMessage ] = useState('')

    console.log( state.currentUser)

    function handleChange( e ) {
        addState()

        function addState(){
            setErrorMessage( {
                ...errorMessage, [e.target.name]: ``
            } );
            setNoteFormState( {
                ...noteFormState, [e.target.name]: e.target.value
            } )
        }
    }

    const [ addNote, { error }] = useMutation(ADD_NOTE, {
        update(cache, { data: { addNote } }) {
            try {
                // console.log( cache )
                // const { quotes } = cache.readQuery({ query: QUERY_QUOTES });
                // cache.writeQuery({
                    //     query: QUERY_QUOTES,
                    //     data: { quotes: [addQuote] }
                    // });
                window.location.reload("/");
            } catch (e) {
                console.error(e);
            }
        }
      });


    const handleSubmit = async event =>{
        console.log( 'submit' )
        event.preventDefault()
        try {
            console.log( quoteId, noteFormState.newNote, state.currentUser.nickname )
            await addNote({
                variables: { 
                    input:{
                        quoteId: quoteId,
                        noteText: noteFormState.newNote,
                        noteBy: state.currentUser.nickname,
                    }
                 }
            });      
            } catch (event) {
                window.location.reload();
        }
    }

    return (
    <form className="note-form" onSubmit={ handleSubmit }  autoComplete="off">
        <label htmlFor="newNote">Add new note:</label>
        <textarea name="newNote" rows="5" onBlur={handleChange}>

        </textarea>
        <button type="submit">Add note</button>
    </form>
    )
};

export default NoteForm;
