import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_FILTER } from '../utils/actions';

const Filter = () => {

  const [state, dispatch] = useStoreContext();

  const dropDown = [
    {value: 'quote-asc', label: 'Quote Age Ascending', filter: (arr)=>{ return arr.sort( ( a, b ) => a.createdAt - b.createdAt ) } },
    {value: 'quote-desc', label: 'Quote Age Descending', filter: (arr)=>{ return arr.sort( ( a, b ) => b.createdAt - a.createdAt ) } },
    {value: 'po-asc', label: 'PO Date Ascending', filter: (arr)=>{ return arr.filter( x => x.PODate > 0 ).sort( ( a, b ) => b.PODate - a.PODate ) } },
    {value: 'po-desc', label: 'PO Date Descending', filter: (arr)=>{ return arr.filter( x => x.PODate > 0 ).sort( ( a, b ) => a.PODate - b.PODate ) } },
    {value: 'priority-asc', label: 'Priority Ascending', filter: (arr)=>{ return arr.filter( x => x.priority > 0 ).sort( ( a, b ) => Number(a.priority) - Number(b.priority) ) } },
    {value: 'priority-desc', label: 'Priority Descending', filter: function(arr){ return arr.filter( x => x.priority > 0 ).sort( ( a, b ) => Number(b.priority) - Number(a.priority) ) } },
  ]

  const newFilter = (e) => {
    const filter = dropDown.find( x => x.value === e.target.value ).filter

    dispatch({ 
      type: UPDATE_FILTER,
      currentFilter: { name: e.target.value, filter: filter }
    });
  }

  return (
      <div className="filter-container">
          <div className="filter-el">
              <select id="date-filter" onChange={ newFilter } value={ state.currentFilter.name }>
              { dropDown.map((x) => {
                    return <option key={ x.value } value={ x.value } >{ x.label }</option>
                })}
              </select>
          </div>
      </div>
    )
};

export default Filter;
