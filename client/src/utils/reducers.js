import { useReducer } from 'react';
import {
    UPDATE_USER,
    UPDATE_DATASTORE,
    UPDATE_CURRENT_QUOTE
} from "./actions";
  
export const reducer = ( state, action ) => {
    switch (action.type) {
        case UPDATE_USER:
        return {
            ...state,
            currentUser: action.currentUser,
        };

        default:
        return state;
    }
};

export function useStateReducer( initialState ) {
    return useReducer( reducer, initialState );
}