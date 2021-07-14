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

    if (!quotes.length) {
        return <h3>No quotes Yet</h3>;
    }

    console.log( quotes )

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
                        <RotatedEl text={ dateDiff( quote.PODate, 30 ).diff } hover="PO Date:" data={ quote.createdAt } colorRange='30' icon={ FaDollarSign() }/>
                        )
                    } 
                    <div className="details">
                        <div className='jnum'>{ `J${ quote.jNum }` }</div>
                        <div className='customer'>- { quote.customerName }</div>
                        <div className='desc'>- { quote.description }</div>
                        <div className="additional"></div>
                    </div>
                </div>
                <div className="quoteCardBottom">
                    { ( quote.crmURL !== '' && quote.crmURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "crm" } url={ quote.crmURL } target={ "_blank "} />}
                    { ( quote.pcsURL !== '' && quote.pcsURL !== null)  && <CardLink icon={ FiExternalLink() } text={ "pcs" } url={ quote.pcsURL } target={ "_blank "}/>}
                    <CardLink icon={ FiEdit() } text={ "edit" } url={ `/edit/${quote._id}` } target={ `/edit/${quote._id}`  }/>
                    <Link to={`/edit/${quote._id}`} >Test</Link>
                </div>

            </article>
        ))}
    </div>
    
  );
};

export default QuoteList;
