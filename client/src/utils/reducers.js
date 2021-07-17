import { useReducer } from 'react';
import {
    UPDATE_USER,
    UPDATE_DATASTORE
} from "./actions";
  
export const reducer = ( state, action ) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                currentUser: action.currentUser,
            };
        case UPDATE_DATASTORE:
            return {
                ...state,
                dataStore: [...action.dataStore],
            };

        default:
        return state;
    }
};

export function useStateReducer( initialState ) {
    return useReducer( reducer, initialState );
}