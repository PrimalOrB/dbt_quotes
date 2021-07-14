import React from "react";

const Filter = ( { filterState, setFilterState, handleChange } ) => (
  <div className="filter-container">
      <div className="filter-el">
        <label htmlFor="filterPO">Oldest PO</label>
        <input name="filterPO" type="checkbox" onChange={ handleChange } />
      </div>
      <div className="filter-el">
        <label htmlFor="filterPriority">Top Priority</label>
        <input name="filterPriority" type="checkbox" onChange={ handleChange } />
      </div>
      <div className="filter-el">
        <label htmlFor="filterDate">Oldest Task</label>
        <input name="filterDate" type="checkbox" onChange={ handleChange } />
      </div>
  </div>
);

export default Filter;
