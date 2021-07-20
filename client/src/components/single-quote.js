import React from "react";
import { Link } from "react-router-dom";
import RotatedEl from './rotated-element'
import { BsCalendar } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FiEdit, FiExternalLink } from 'react-icons/fi'
import { HiOutlineExclamation } from 'react-icons/hi'
import { MdForum } from 'react-icons/md'
import { CardLink } from './'

const SingleQuote = ( { quoteData } ) => {

    function dateDiff( a ){
        const b = new Date()
        a = new Date(Number(a))
        const day = 1000 * 60 * 60 * 24;
        const timeDiff = b.getTime() - a.getTime();
        const diff = Math.round(timeDiff / day);
        return { diff };
    }

    function transformLabel( label ) {
        if( label.length === 3 ) {
            return label.toUpperCase()
        } else {
            function capitalize(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            return label.split('-').map( capitalize ).join(' ');
            }
    }

    function daysBetween( a, b){
        var delta = Math.abs(a - b) / 1000;
        var days = Math.floor(delta / 86400);
        const str =  Number(days) === 1 ? ' day' : ' days'
        return days + str
    }
        
    return (
        <>
        <article className="quoteCard" key={ quoteData._id }>
                    <div className="quoteCardTop">
                        {quoteData.priority > 0 && (
                            <RotatedEl text={ quoteData.priority } hover="Priority:" data={ quoteData.priority } colorRange='5' icon={ HiOutlineExclamation() }/>
                            )
                        } 
                        <RotatedEl text={ dateDiff( quoteData.createdAt ).diff } hover="Task Date:" data={ quoteData.createdAt } colorRange='30'  icon={ BsCalendar() }/>
                        {quoteData.PODate > 0 && (
                            <RotatedEl text={ dateDiff( quoteData.PODate, 30 ).diff } hover="PO Qty:" data={ quoteData.POQty  } colorRange='30' icon={ FaDollarSign() }/>
                            )
                        } 
                        <div className="details">
                            <div className="sub-details">
                                { quoteData.jNum && <div className='jnum'>{ `J${ quoteData.jNum } :` }</div> }
                                <div className='customer'>{ quoteData.customerName }</div>
                                <div className='desc'>- { quoteData.description }</div>
                            </div>
                            <div className={ `status ${ quoteData.status }` }>{ transformLabel( quoteData.status ) }</div>
                            <div className="additional">{ quoteData.additionalNotes }</div>
                        </div>
                    </div>
                    <div className="quoteCardBottom">
                        <Link className="cardLink" to={`/quote/${quoteData._id}`} ><p><MdForum/>Conversation { quoteData.noteCount > 0 && <span className='note-count' >( { quoteData.noteCount } note{ quoteData.noteCount > 1 && 's' } )</span>}</p></Link>
                        { quoteData.completedDate > 0 && ( <span>Task Duration: { daysBetween( quoteData.completedDate, quoteData.createdAt )  }</span>) }
                        <div className="quoteLinks">
                            { ( quoteData.crmURL !== '' && quoteData.crmURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "crm" } url={ quoteData.crmURL } target={ "_blank "} />}
                            { ( quoteData.pcsURL !== '' && quoteData.pcsURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "pcs" } url={ quoteData.pcsURL } target={ "_blank "}/>}
                            <Link className="cardLink" to={`/edit/${quoteData._id}`} ><p><FiEdit/>edit</p></Link>
                        </div>
                    </div>
            </article>
        </>
    );
};

export default SingleQuote;
