import { SET_VISITS, CREATE_VISIT, DELETE_VISIT, UPDATE_VISIT } from "../constants/actionTypes"

export const setVisits = (visits) => ({
    type: SET_VISITS,
    payload: visits
})

export const addVisit = (visit) => ({
    type: CREATE_VISIT,
    payload: visit
})

export const deleteVisit = (id) => ({
    type: DELETE_VISIT,
    payload: id
})

export const updateVisit = (visit) => ({
    type: UPDATE_VISIT,
    payload: visit
})