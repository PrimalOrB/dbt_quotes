import { useReducer } from 'react';
import Auth from './auth';
import {
    UPDATE_USER,
    UPDATE_DATASTORE,
    UPDATE_FILTER,
    UPDATE_STATUS_FILTER,
    UPDATE_SEARCH,
    UPDATE_EDITED_ENTRY,
    ADD_NEW_ENTRY
} from "./actions";
  
export const reducer = ( state, action ) => {
    switch (action.type) {
        case UPDATE_USER:
            if( action.currentUser.permissions.includes('all') ){
                action.currentUser.permissions = true
                return {
                    ...state,
                    currentUser: action.currentUser,
                } 
            } else {
                console.log( 'logout' )
                action.currentUser.permissions = false
                Auth.logout()
                return  {
                    ...state,
                    currentUser: action.currentUser,
                } 
            }
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
        case ADD_NEW_ENTRY:
            return {
                ...state,
                dataStore: [ ...state.dataStore, action.added ]
            }
        case UPDATE_EDITED_ENTRY:
            return {
                ...state,
                dataStore: [ ...state.dataStore.filter( x => x._id !== action.update._id ), action.update ]
            }
        default:
        return state;
    }
};

export function useStateReducer( initialState ) {
    return useReducer( reducer, initialState );
}
