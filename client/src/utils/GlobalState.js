import React, { createContext, useContext } from "react";
import { useStateReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useStateReducer({
      currentUser: {},
      dataStore: [],
      currentFilter: 'quote-asc',
    });
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };