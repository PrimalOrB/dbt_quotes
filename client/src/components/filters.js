import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_FILTER } from '../utils/actions';

const Filter = ( { filterState, setFilterState, handleChange } ) => {

  const [state, dispatch] = useStoreContext();

  const dropDown = [
    {value: 'quote-asc', label: 'Quote Age Ascending'},
    {value: 'quote-desc', label: 'Quote Age Descending'},
    {value: 'po-asc', label: 'PO Date Ascending'},
    {value: 'po-desc', label: 'PO Date Descending'},
    {value: 'priority-asc', label: 'Priority Ascending'},
    {value: 'priority-desc', label: 'Priority Descending'},
]

    return (
        <div className="filter-container">
            <div className="filter-el">
                <select id="date-filter">
                { dropDown.map((x) => {
                      return <option key={ x.value } value={ x.value } >{ x.label }</option>
                  })}
                </select>
            </div>


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
