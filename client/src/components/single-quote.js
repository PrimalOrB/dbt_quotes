import React from "react";
import { Link } from "react-router-dom";
import RotatedEl from './rotated-element'
import { BsCalendar } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FiEdit, FiExternalLink } from 'react-icons/fi'
import { HiOutlineExclamation } from 'react-icons/hi'
import { MdForum } from 'react-icons/md'
import { CardLink } from './'
import { format_plural, format_label_case, calc_days_between, calc_days_to_current } from "../utils/helpers";

const SingleQuote = ( { quoteData } ) => {     
    return (
        <>
            <article className="quoteCard" key={ quoteData._id }>
                <div className="quoteCardTop">
                    {quoteData.priority > 0 && (
                        <RotatedEl text={ quoteData.priority } hover="Priority:" data={ quoteData.priority } colorRange='5' icon={ HiOutlineExclamation() }/>
                        )
                    } 
                    <RotatedEl text={ calc_days_to_current( quoteData.createdAt ).diff } hover="Task Date:" data={ quoteData.createdAt } colorRange='30'  icon={ BsCalendar() }/>
                    {quoteData.PODate > 0 && (
                        <RotatedEl text={ calc_days_to_current( quoteData.PODate, 30 ).diff } hover="PO Qty:" data={ quoteData.POQty  } colorRange='30' icon={ FaDollarSign() }/>
                        )
                    } 
                    <div className="details">
                        <div className="sub-details">
                            { quoteData.jNum && <div className='jnum'>{ `J${ quoteData.jNum } :` }</div> }
                            <div className='customer'>{ quoteData.customerName }</div>
                            <div className='desc'>- { quoteData.description }</div>
                        </div>
                        <div className={ `status ${ quoteData.status }` }>{ format_label_case( quoteData.status ) }</div>
                        <div className="additional">{ quoteData.additionalNotes }</div>
                    </div>
                </div>
                <div className="quoteCardBottom">
                    <Link className="cardLink" to={`/quote/${quoteData._id}`} ><p><MdForum/>Conversation { quoteData.noteCount > 0 && <span className='note-count' >( { quoteData.noteCount } { format_plural( 'note', quoteData.noteCount ) } )</span>}</p></Link>
                    { quoteData.completedDate > 0 && ( <span>Task Duration: { calc_days_between( quoteData.completedDate, quoteData.createdAt ) } { format_plural( 'day', calc_days_between( quoteData.completedDate, quoteData.createdAt ) )  }</span>) }
                    <div className="quoteLinks">
                        { ( quoteData.statusMtl !== '' && quoteData.statusMtl !== null)  && <CardLink icon={ FiExternalLink() } text={ "material" } rel="noopener noreferrer" url={ quoteData.mtlURL } target={ `_mtl${quoteData._id}` } status={ quoteData.statusMtl }/>}
                        { ( quoteData.crmURL !== '' && quoteData.crmURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "crm" } rel="noopener noreferrer" url={ quoteData.crmURL } target={ `_blank${quoteData._id}` } />}
                        { ( quoteData.pcsURL !== '' && quoteData.pcsURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "pcs" } rel="noopener noreferrer" url={ quoteData.pcsURL } target={ `crm${quoteData._id}` }/>}
                        <Link className="cardLink" to={`/edit/${quoteData._id}`} ><p><FiEdit/>edit</p></Link>
                    </div>
                </div>
            </article>
        </>
    );
};

export default SingleQuote;
