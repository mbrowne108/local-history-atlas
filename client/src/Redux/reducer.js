import { SET_SITES, CREATE_SITE, SET_VISITS, CREATE_VISIT, DELETE_VISIT, UPDATE_VISIT } from "./constants/actionTypes"

const initialState = {sites: [], visits: []}
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SITES:
            return {...state, sites: action.payload};

        case CREATE_SITE:
            return {...state, sites: [...state.sites, action.payload]};

        case SET_VISITS:   
            return {...state, visits: action.payload};

        case CREATE_VISIT:
            return {...state, visits: [...state.visits, action.payload]};

        case DELETE_VISIT:
            const newVisits = state.visits.filter((visit) => visit.id !== action.payload)
            return {...state, visits: newVisits};

        case UPDATE_VISIT:
            const updatedVisits = state.visits.map((visit) => {
                if (visit.id === action.payload.id) {
                  return action.payload
                } else {
                  return visit
                }
              })
              return {...state, visits: updatedVisits}
              
        default:
            return state;
    }
}