export const dropDownStatus = [
    {value: 'tbd', label: 'Assign Status', filter: (arr)=>{ return arr.filter( x => x.status === 'tbd') } },
    {value: 'rfq', label: 'RFQ', filter: (arr)=>{ return arr.filter( x => x.status === 'rfq')}},
    {value: 'quote-review', label: 'Quote Review', filter: (arr)=>{ return arr.filter( x => x.status === 'quote-review')}},
    {value: 'production', label: 'Production', filter: (arr)=>{ return arr.filter( x => x.status === 'production')}},
    {value: 'production-review', label: 'Production Review', filter: (arr)=>{ return arr.filter( x => x.status === 'production-review')}},
    {value: 'production-ready', label: 'Production Ready', filter: (arr)=>{ return arr.filter( x => x.status === 'production-ready')}},
    {value: 'hold', label: 'On Hold', filter: (arr)=>{ return arr.filter( x => x.status === 'hold')}},
    {value: 'archived', label: 'Archived', filter: (arr)=>{ return arr.filter( x => x.status === 'archived')}}
]

export const dropDownSort = [
    {value: 'quote-asc', label: 'Quote Age Ascending', filter: (arr)=>{ return arr.sort( ( a, b ) => a.createdAt - b.createdAt ) } },
    {value: 'quote-desc', label: 'Quote Age Descending', filter: (arr)=>{ return arr.sort( ( a, b ) => b.createdAt - a.createdAt ) } },
    {value: 'po-asc', label: 'PO Date Ascending', filter: (arr)=>{ return arr.filter( x => x.PODate > 0 ).sort( ( a, b ) => b.PODate - a.PODate ) } },
    {value: 'po-desc', label: 'PO Date Descending', filter: (arr)=>{ return arr.filter( x => x.PODate > 0 ).sort( ( a, b ) => a.PODate - b.PODate ) } },
    {value: 'priority-asc', label: 'Priority Ascending', filter: (arr)=>{ return arr.filter( x => x.priority > 0 ).sort( ( a, b ) => Number(a.priority) - Number(b.priority) ) } },
    {value: 'priority-desc', label: 'Priority Descending', filter: function(arr){ return arr.filter( x => x.priority > 0 ).sort( ( a, b ) => Number(b.priority) - Number(a.priority) ) } },
    {value: 'no-priority', label: 'No Priority Assigned', filter: function(arr){ return arr.filter( x => x.priority < 1 ).sort( ( a, b ) => a.createdAt - b.createdAt ) } },
  ]
