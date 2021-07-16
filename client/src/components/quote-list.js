import React from "react";
import RotatedEl from './rotated-element'
import { Link } from "react-router-dom";
import { BsCalendar } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { FiEdit, FiExternalLink } from 'react-icons/fi'
import { HiOutlineExclamation } from 'react-icons/hi'
import { CardLink } from './'


const QuoteList = ( { quotes } ) => {

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

    if (!quotes.length) {
        return <h3>No quotes Yet</h3>;
    }

    return (
        <div className="quoteList">
            {quotes &&
            quotes.map(quote => (
                <article className="quoteCard" key={ quote._id }>
                    <div className="quoteCardTop">
                        {quote.priority > 0 && (
                            <RotatedEl text={ quote.priority } hover="Priority:" data={ quote.priority } colorRange='5' icon={ HiOutlineExclamation() }/>
                            )
                        } 
                        <RotatedEl text={ dateDiff( quote.createdAt ).diff } hover="Task Date:" data={ quote.createdAt } colorRange='30'  icon={ BsCalendar() }/>
                        {quote.PODate > 0 && (
                            <RotatedEl text={ dateDiff( quote.PODate, 30 ).diff } hover="PO Qty:" data={ quote.POQty  } colorRange='30' icon={ FaDollarSign() }/>
                            )
                        } 
                        <div className="details">
                            <div className="sub-details">
                                <div className='jnum'>{ `J${ quote.jNum }` }</div>
                                <div className='customer'>- { quote.customerName }</div>
                                <div className='desc'>- { quote.description }</div>
                            </div>
                            <div className={ `status ${ quote.status }` }>{ transformLabel( quote.status ) }</div>
                            <div className="additional">{ quote.additionalNotes }</div>
                        </div>
                    </div>
                    <div className="quoteCardBottom">
                        { ( quote.crmURL !== '' && quote.crmURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "crm" } url={ quote.crmURL } target={ "_blank "} />}
                        { ( quote.pcsURL !== '' && quote.pcsURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "pcs" } url={ quote.pcsURL } target={ "_blank "}/>}
                        <Link className="cardLink" to={`/edit/${quote._id}`} ><p><FiEdit/>edit</p></Link>
                    </div>

                </article>
            ))}
        </div>
    );
};

export default QuoteList;
