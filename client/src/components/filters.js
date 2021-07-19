import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_FILTER, UPDATE_STATUS_FILTER } from '../utils/actions';
import { dropDownStatus, dropDownSort } from '../utils/dropdowns';

const Filter = () => {

  const [state, dispatch] = useStoreContext();

  const newFilter = (e) => {
    const filter = dropDownSort.find( x => x.value === e.target.value ).filter

    dispatch({ 
      type: UPDATE_FILTER,
      currentFilter: { name: e.target.value, filter: filter }
    });
  }

  const newStatusFilter = (e) => {
    if( e.target.value !== 'all' ){
      const filter = dropDownStatus.find( x => x.value === e.target.value ).filter
  
      dispatch({ 
        type: UPDATE_STATUS_FILTER,
        currentStatusFilter: { name: e.target.value, filter: filter }
      });
    } else {
      dispatch({ 
        type: UPDATE_STATUS_FILTER,
        currentStatusFilter: { name: e.target.value, filter: (arr)=>{ return arr } }
      })
    }
  }


  return (
      <div className="filter-container">
          <div className="filter-el">
            <label htmlFor="date-filter">Sort By</label>
              <select id="date-filter" onChange={ newFilter } value={ state.currentFilter.name }>
              { dropDownSort.map((x) => {
                    return <option key={ x.value } value={ x.value } >{ x.label }</option>
                })}
              </select>
          </div>
          <div className="filter-el">
            <label htmlFor="status-filter">Filter Status</label>
              <select id="status-filter" onChange={ newStatusFilter } value={ state.currentStatusFilter.name }>
              <option  value='all' >All</option>
              { dropDownStatus.map((x) => {
                    return <option key={ x.value } value={ x.value } >{ x.label }</option>
                })}
              </select>
          </div>
      </div>
    )
};

export default Filter;
