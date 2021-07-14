import React from "react";

const Filter = ( { filterState, setFilterState, handleChange } ) => {

    return (
        <div className="filter-container">
            <div className="filter-el">
              <p id="filterPO" onClick={ handleChange } className={ filterState.filterPO ? 'clicked' : '' }>Oldest PO</p>
            </div>
            <div className="filter-el">
              <p id="filterPriority" onClick={ handleChange } className={ filterState.filterPriority ? 'clicked' : '' }>Top Priority</p>
            </div>
            <div className="filter-el">
              <p id="filterDate" onClick={ handleChange } className={ filterState.filterDate ? 'clicked' : '' }>Newest Task</p>
            </div>
        </div>
    )
};

export default Filter;
