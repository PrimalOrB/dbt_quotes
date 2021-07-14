import React from "react";
import RotatedEl from './rotated-element'
import { BsCalendar } from 'react-icons/bs'
import { FaDollarSign } from 'react-icons/fa'
import { HiOutlineExclamation } from 'react-icons/hi'


const QuoteList = ( { quotes } ) => {

    console.log( quotes )

    function dateDiff( a, range ){
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

  return (
    <div className="quoteList">
        <div className="search-filters">Filters</div>
        {quotes &&
        quotes.map(quote => (
            <article className="quoteCard" key={ quote._id }>
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

            </article>
        ))}
    </div>
    
  );
};

export default QuoteList;
