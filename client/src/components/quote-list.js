import React from "react";
import { SingleQuote } from '../components'


const QuoteList = ( { quotes } ) => {

    return (
        <div className="quoteList">
            {quotes &&
            quotes.map(quote => (
                <SingleQuote quoteData={ quote } />
            ))}
        </div>
    );
};

export default QuoteList;
