import { useReducer } from 'react';
import {
    UPDATE_USER,
    UPDATE_DATASTORE,
    UPDATE_FILTER,
    UPDATE_STATUS_FILTER,
    UPDATE_SEARCH
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
        case UPDATE_FILTER:
            return {
                ...state,
                currentFilter: action.currentFilter,
            };
        case UPDATE_STATUS_FILTER:
            return {
                ...state,
                currentStatusFilter: action.currentStatusFilter,
            } 
        case UPDATE_SEARCH:
            return {
                ...state,
                stringFilter: action.stringFilter,
            }    
        default:
        return state;
    }
};

export function useStateReducer( initialState ) {
    return useReducer( reducer, initialState );
}
