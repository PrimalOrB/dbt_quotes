import React from "react";


const QuoteList = ( { quotes } ) => {


    if (!quotes.length) {
        return <h3>No quotes Yet</h3>;
    }

  return (
    <div className="quoteList">
        <div className="search-filters">Filters</div>
        {quotes &&
        quotes.map(quote => (
            <article className="quoteCard" key={ quote._id }>
                <h3>{ quote.customerName }</h3>
                <h3>{ `J${ quote.jNum }` }</h3>
                <h3> { quote.status }</h3>
            </article>
        ))}
    </div>
    
  );
};

export default QuoteList;
