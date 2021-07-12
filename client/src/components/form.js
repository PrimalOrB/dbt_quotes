import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_QUOTE } from '../utils/mutations';
import { QUERY_QUOTES } from '../utils/queries';


const AddForm = () => {

    const [formState, setFormState] = useState({
        'customerName':'',
        'jNum':'',
        'description':'',
        'priority':'',
        'additionalNotes':'',
        'pcsURL':'',
        'crmURL':'',
        'status':'',
        'PODate':'',
        'POQty':'',
    });
    const [ errorMessage, setErrorMessage ] = useState( '' )

    function handleChange( e ) {
        if ( !e.target.value.length ) {
            setErrorMessage( `${ e.target.name } is required.` );
        } else {
            setErrorMessage( '' );
        }
        if( !errorMessage ){
            setFormState( {
                ...formState, [e.target.name]: e.target.value
            } )
        }  
    }

    const [ addQuote, { error }] = useMutation(ADD_QUOTE, {
        update(cache, { data: { addQuote } }) {
            try {
            console.log( addQuote )
            const { quotes } = cache.readQuery({ query: QUERY_QUOTES });
            cache.writeQuery({
              query: QUERY_QUOTES,
              data: { quotes: [addQuote, ...quotes] }
            });
          } catch (e) {
            console.error(e);
          }
        }
      });


    const handleSubmit = async event =>{
        event.preventDefault()
        console.log( formState )
        try {
            await addQuote({
                variables: { formState }
            });
        
            } catch (event) {
            console.error(event);
        }
    }


    return (
        <section id="add-form-cont">
            <form id="add-form" onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="customerName">Customer:</label>
                    <input type="text" name="customerName"  placeholder='Customer name *' className="form-required" onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="jNum">J#:</label>
                    <input type="number" min="10000" name="jNum" placeholder='##### ( numbers only )' onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" placeholder='Short description *' className="form-required" onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <input type="number" min="1" max="5" placeholder='Task priority' name="priority" onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="additionalNotes">Additional Notes:</label>
                    <textarea name="additionalNotes" rows="5"  placeholder='Enter additional notes' onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="pcsURL">PCS URL:</label>
                    <input type="text" name="pcsURL"  placeholder='http://pcs.deboertool.com/...' onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="crmURL">CRM Opportunity:</label>
                    <input type="text" name="crmURL"  placeholder='https://deboertool.com/crm/app/opportunities/...'onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="status">Assign a status:</label>
                    <select name="status" id="status" onBlur={handleChange}>
                            {/* <option disabled="disabled">Assign status</option>
                            <option value="finished">Finished</option> */}
                    </select>
                </div>
                <div>
                    <label htmlFor="PODate">PO Received:</label>
                    <input type="text" name="PODate" placeholder='Date Purchase Order Received' onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="POQty">PO Quantity:</label>
                    <input type="text" name="POQty" placeholder='Quantity of item on Purchase Order' onBlur={handleChange}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default AddForm;
