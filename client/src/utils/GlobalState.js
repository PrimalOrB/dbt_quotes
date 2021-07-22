import React, { createContext, useContext } from "react";
import { useStateReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useStateReducer({
      currentUser: {},
      dataStore: [],
      currentFilter: { name: 'quote-desc', filter: ( arr )=>{ return arr.sort( ( a, b ) => b.createdAt - a.createdAt ) } },
      currentStatusFilter: { name: 'all', filter: ( arr )=>{ return arr } },
      stringFilter: ''
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
