import React, { createContext, useContext } from "react";
import { useStateReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useStateReducer({
      currentUser: {},
      dataStore: [],
      currentFilter: { name: 'quote-asc', filter: (arr)=>{ return arr.sort( ( a, b ) => a.createdAt - b.createdAt ) } },
      currentStatusFilter: { name: 'all', filter: (arr)=>{ return arr } },
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
