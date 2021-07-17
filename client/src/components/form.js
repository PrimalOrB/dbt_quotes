import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { ADD_QUOTE, EDIT_QUOTE } from '../utils/mutations';
import { QUERY_QUOTES, QUERY_QUOTE } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loading } from './'
import { useStoreContext } from "../utils/GlobalState";

const AddForm = () => {

    const [state] = useStoreContext();

    const initialState = {
        customerName:'',
        jNum:'',
        description:'',
        priority:'',
        additionalNotes:'',
        pcsURL:'',
        crmURL:'',
        status:'tbd',
        PODate:'',
        POQty:'',
    }

    const initialErrorMessage = {
        'customerName':'input-error',
        'description':'input-error',
        'pcsURL':'',
        'crmURL':'',
    }

    const dropDown = [
        {value: 'tbd', label: 'Assign Status'},
        {value: 'rfq', label: 'RFQ'},
        {value: 'quote-review', label: 'Quote Review'},
        {value: 'production', label: 'Production'},
        {value: 'production-review', label: 'Production Review'},
        {value: 'production-ready', label: 'Production Ready'},
        {value: 'hold', label: 'On Hold'},
        {value: 'archived', label: 'Archived'}
    ]

    const [ formState, setFormState ] = useState( initialState );
   
    const [ errorMessage, setErrorMessage ] = useState( initialErrorMessage )

    function handleChange( e ) {
        console.log( formState )
        switch ( e.target.name ){
            case 'customerName': case 'description':
                if( e.target.value.length === 0 ){
                    setErrorMessage( {
                        ...errorMessage, [e.target.name]: `input-error`
                    } )
                } else {
                    addState()
                }
                break
            case 'pcsURL': case 'crmURL':
                if( e.target.value.length > 0 ){
                    const value = e.target.value
                    const regex = /https?:\/\/(www\.)?(pcs\.)?(deboertool.com)/
                    if( !value.match(regex) ){
                        setErrorMessage( {
                            ...errorMessage, [e.target.name]: `input-error`
                        } )
                    } else {
                        addState()
                    }
                } else {
                    addState()
                }
                break
            case 'jNum':
                const match = state.dataStore.filter( quote => quote.jNum === e.target.value )
                if( match ){
                    console.log( match[0]._id)
                    alert( `${e.target.value} already exists, loading content...` )
                    window.location.replace(`/edit/${match[0]._id}`);
                }
                addState()
                break
            default: 
                addState()
                break
        }

        function addState(){
            setErrorMessage( {
                ...errorMessage, [e.target.name]: ``
            } );
            setFormState( {
                ...formState, [e.target.name]: e.target.value
            } )
        }
    }

    let errors = 0
    for(var key in errorMessage) {
        var value = errorMessage[key];
        if( value ){
            errors += 1
        }
    }

    const [ addQuote, { error }] = useMutation(ADD_QUOTE, {
        update(cache, { data: { addQuote } }) {
            try {
                console.log( cache )
                // const { quotes } = cache.readQuery({ query: QUERY_QUOTES });
                cache.writeQuery({
                    query: QUERY_QUOTES,
                    data: { quotes: [addQuote] }
                });
                window.location.replace("/");
            } catch (e) {
                console.error(e);
            }
        }
      });

    const [ editQuote, { error2 }] = useMutation(EDIT_QUOTE, {
    update(cache, { data: { editQuote } }) {
        try {
            console.log( editQuote )
            // const { quotes } = cache.readQuery({ query: QUERY_QUOTES });
            cache.writeQuery({
                query: QUERY_QUOTES,

                data: { quotes: [editQuote] }
            });
            window.location.replace("/");
        } catch (e) {
            console.error(e);
        }
    }
    });

    const handleSubmit = async event =>{
        console.log( 'submit' )
        event.preventDefault()
        try {
            console.log( formState )
            await addQuote({
                variables: { 
                    customerName: formState.customerName,
                    jNum: formState.jNum,
                    description: formState.description,
                    priority: formState.priority,
                    additionalNotes: formState.additionalNotes,
                    pcsURL: formState.pcsURL,
                    crmURL: formState.crmURL,
                    status: formState.status,
                    PODate: formState.PODate,
                    POQty: formState.POQty,
                 }
            });
        
            } catch (event) {
        }
    }

    const handleEdit = async event =>{
        event.preventDefault()
        try {
            console.log( formState )
            await editQuote({
                variables: { 
                    id: quote._id,
                    customerName: formState.customerName,
                    jNum: formState.jNum,
                    description: formState.description,
                    priority: formState.priority,
                    additionalNotes: formState.additionalNotes,
                    pcsURL: formState.pcsURL,
                    crmURL: formState.crmURL,
                    status: formState.status,
                    PODate: formState.PODate,
                    POQty: formState.POQty,
                 }
            });
        
            } catch (event) {
        }
    }

    const { id: _id } = useParams();

    const { loading, data } = useQuery(QUERY_QUOTE,{
        variables: { id: _id }
    });

    const quote = data?.quote || {...initialState}

    useEffect(() => {
        setFormState( {
            ...quote
        } )
        data?.quote && setErrorMessage('')
    },[data?.quote])

    if (loading) {
        return <Loading/>;
    }
    
    return (
        <>
        { ( error || error2 ) && <span className="api-error">API Error</span> }
        { quote?._id ? 
        <>
        <h1>Edit Quote</h1>
        <section id="add-form-cont">
            <form id="add-form" onSubmit={ handleEdit }>
                <div>
                    <label htmlFor="customerName">Customer:</label>
                    <input type="text" name="customerName"  placeholder='Customer name *' defaultValue={ formState.customerName === null ? '' : formState.customerName } className={ `form-required ${errorMessage.customerName}` } required onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="jNum">J#:</label>
                    <input type="number" min="10000" name="jNum" placeholder='##### ( numbers only )' defaultValue={ formState.jNum === null ? '' : formState.jNum } onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" placeholder='Short description *' defaultValue={ formState.description === null ? '' : formState.description } className={ `form-required ${errorMessage.description}` } required onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <input type="number" min="1" max="5" placeholder='Task priority' defaultValue={ formState.priority === null ? '' : formState.priority } name="priority" onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="additionalNotes">Additional Notes:</label>
                    <textarea name="additionalNotes" rows="5"  placeholder='Enter additional notes' defaultValue={ formState.additionalNotes === null ? '' : formState.additionalNotes } onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="pcsURL">PCS URL:</label>
                    <input type="text" name="pcsURL"  placeholder='http://pcs.deboertool.com/...' defaultValue={ formState.pcsURL === null ? '' : formState.pcsURL } onBlur={handleChange} className={ errorMessage.pcsURL }/>
                </div>
                <div>
                    <label htmlFor="crmURL">CRM Opportunity:</label>
                    <input type="text" name="crmURL"  placeholder='https://deboertool.com/crm/app/opportunities/...' defaultValue={ formState.crmURL === null ? '' : formState.crmURL }  onBlur={handleChange} className={ errorMessage.crmURL }/>
                </div>
                <div>
                    <label htmlFor="status">Assign a status:</label>
                    <select name="status" id="status" value={ formState.status } onChange={handleChange}>
                        { dropDown.map((x) => {
                                return <option key={ x.value } value={ x.value } >{ x.label }</option>
                            })}
                    </select>
                    {/* <Select id='status' value={ dropDown.value } defaultValue={ formState.status === null ? '' : formState.status }/> */}
                </div>
                <div>
                    <label htmlFor="PODate">PO Received Date:</label>
                    <input type="date" name="PODate" placeholder='Date Purchase Order Received' defaultValue={ quote.PODate === null ? '' : new Date(Number(quote.PODate)).toISOString().substr(0,10) } onBlur={handleChange} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="POQty">PO Quantity:</label>
                    <input type="text" name="POQty" placeholder='Quantity of item on Purchase Order' defaultValue={ formState.POQty === null ? '' : formState.POQty } onBlur={handleChange}/>
                </div>
                { !errors ? <button type="submit">Edit</button> : <p className="form-error">{errors} Input Error{errors > 1 && 's'}</p>}
            </form>
        </section> 
        </>
        : 
        <>
        <h1>Add New Quote</h1>
        <section id="add-form-cont">
            <form id="add-form" onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="customerName">Customer:</label>
                    <input type="text" name="customerName"  placeholder='Customer name *' className={ `form-required ${errorMessage.customerName}` } required onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="jNum">J#:</label>
                    <input type="number" min="10000" name="jNum" placeholder='##### ( numbers only )' onBlur={handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" placeholder='Short description *' className={ `form-required ${errorMessage.description}` } required onBlur={handleChange}/>
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
                    <input type="text" name="pcsURL"  placeholder='http://pcs.deboertool.com/...' onBlur={handleChange} className={ errorMessage.pcsURL }/>
                </div>
                <div>
                    <label htmlFor="crmURL">CRM Opportunity:</label>
                    <input type="text" name="crmURL"  placeholder='https://deboertool.com/crm/app/opportunities/...'onBlur={handleChange} className={ errorMessage.crmURL }/>
                </div>
                <div>
                    <label htmlFor="status">Assign a status:</label>
                    <select name="status" id="status" onBlur={handleChange}>
                        { dropDown.map((x) => {
                            return <option key={ x.value } value={ x.value } >{ x.label }</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="PODate">PO Received Date:</label>
                    <input type="date" name="PODate" placeholder='Date Purchase Order Received' onBlur={handleChange} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="POQty">PO Quantity:</label>
                    <input type="text" name="POQty" placeholder='Quantity of item on Purchase Order' onBlur={handleChange}/>
                </div>
                { !errors ? <button type="submit">Add New</button> : <p className="form-error">{errors} Input Error{errors > 1 && 's'}</p>}
            </form>
        </section>
        </>
        }
        </>
    );
};

export default AddForm;
