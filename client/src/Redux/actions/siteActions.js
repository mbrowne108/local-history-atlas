import { SET_SITES, CREATE_SITE } from "../constants/actionTypes"

export const setSites = (sites) => ({
    type: SET_SITES,
    payload: sites
})

export const addSite = (site) => ({
    type: CREATE_SITE,
    payload: site
})