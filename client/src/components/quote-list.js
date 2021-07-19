import React from "react";
import { SingleQuote } from '../components'


const QuoteList = ( { quotes } ) => {

    return (
        <div className="quoteList">
            {quotes &&
            quotes.map(quote => (
                <SingleQuote key={ quote._id } quoteData={ quote } />
            ))}
        </div>
    );
};

export default QuoteList;
