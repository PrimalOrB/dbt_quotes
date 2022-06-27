import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_QUOTE, EDIT_QUOTE } from '../utils/mutations';
import { QUERY_QUOTE } from '../utils/queries';
import { dropDownStatus, dropDownMaterial } from '../utils/dropdowns';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loading } from './'
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_EDITED_ENTRY, ADD_NEW_ENTRY } from '../utils/actions'

const AddForm = () => {

    const [state, dispatch] = useStoreContext();

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
        statusMtl: '',
        mtlURL: '',
    }

    const history = useHistory();

    const initialErrorMessage = {
        'customerName':'input-error',
        'description':'input-error',
        'pcsURL':'',
        'crmURL':'',
        'mtlURL': '',
    }

    const [ formState, setFormState ] = useState( initialState );
   
    const [ errorMessage, setErrorMessage ] = useState( initialErrorMessage )

    function handleChange( e ) {
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
            case 'pcsURL': case 'crmURL': case 'mtlURL':
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
                if( match.length ){
                    console.log( match[0]._id)
                    alert( `${e.target.value} already exists, loading content...` )
                    history.push(`/edit/${match[0]._id}`)
                    // window.location.replace(`/edit/${match[0]._id}`);
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
        onCompleted: data=> {
            console.log( data )
            dispatch({
                type: ADD_NEW_ENTRY,
                added: data.addQuote
              });
              history.push('/')
        },
        onError: err => {
            console.log( err )
        }
      });

    const [ editQuote, { error2 }] = useMutation(EDIT_QUOTE, {
        onCompleted: data=> {
            dispatch({
                type: UPDATE_EDITED_ENTRY,
                update: data.editQuote
              });
              history.push('/')
        },
        onError: err => {
            console.log( err )
        }
    });

    const handleSubmit = async event =>{
        console.log( 'submit' )
        event.preventDefault()
        try {
            await addQuote({
                variables: { 
                    input:{
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
                        statusMtl: formState.statusMtl,
                        mtlURL: formState.mtlURL,
                        user: state.currentUser.user.nickname,
                    },
                 }
            });      
            } catch (event) {
        }
    }


    const handleEdit = async event =>{
        event.preventDefault()
        try {
            await editQuote({
                variables: { 
                    input:{
                        _id: quote._id,
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
                        statusMtl: formState.statusMtl,
                        mtlURL: formState.mtlURL,
                        user: state.currentUser.user.nickname,
                    }, 
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <form id="add-form" onSubmit={ handleEdit } autoComplete="off">
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
                        { dropDownStatus.map((x) => {
                                return <option key={ x.value } value={ x.value } >{ x.label }</option>
                            })}
                    </select>
                </div>
                <div>
                    <label htmlFor="PODate">PO Received Date:</label>
                    <input type="date" name="PODate" placeholder='Date Purchase Order Received' defaultValue={ quote.PODate === null ? '' : new Date(Number(quote.PODate)).toISOString().substr(0,10) } onBlur={handleChange} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="POQty">PO Quantity:</label>
                    <input type="text" name="POQty" placeholder='Quantity of item on Purchase Order' defaultValue={ formState.POQty === null ? '' : formState.POQty } onBlur={handleChange}/>
                </div>
                <h1>Raw Material</h1>
                <div>
                    <label htmlFor="statusMtl">Raw Material:</label>
                    <select name="statusMtl" id="statusMtl" value={ formState.statusMtl } onChange={handleChange}>
                        { dropDownMaterial.map((x) => {
                                return <option key={ x.value } value={ x.value } >{ x.label }</option>
                            })}
                    </select>
                </div>
                <div>
                    <label htmlFor="mtlURL">Material PO URL:</label>
                    <input type="text" name="mtlURL"  placeholder='http://pcs.deboertool.com/purchasing/purchase_order_view.php?...' defaultValue={ formState.mtlURL === null ? '' : formState.mtlURL } onBlur={handleChange} className={ errorMessage.pcsURL }/>
                </div>
                { !errors ? <button type="submit">Edit</button> : <p className="form-error">{errors} Input Error{errors > 1 && 's'}</p>}
            </form>
        </section> 
        </>
        : 
        <>
        <h1>Add New Quote</h1>
        <section id="add-form-cont">
            <form id="add-form" onSubmit={ handleSubmit } autoComplete="off">
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
                        { dropDownStatus.map((x) => {
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
                <h1>Raw Material</h1>
                <div>
                    <label htmlFor="statusMtl">Raw Material:</label>
                    <select name="statusMtl" id="statusMtl" value={ formState.statusMtl } onChange={handleChange}>
                        { dropDownMaterial.map((x) => {
                                return <option key={ x.value } value={ x.value } >{ x.label }</option>
                            })}
                    </select>
                </div>
                <div>
                    <label htmlFor="mtlURL">Material PO URL:</label>
                    <input type="text" name="mtlURL"  placeholder='http://pcs.deboertool.com/purchasing/purchase_order_view.php?...' defaultValue={ formState.mtlURL === null ? '' : formState.mtlURL } onBlur={handleChange} className={ errorMessage.mtlURL }/>
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
