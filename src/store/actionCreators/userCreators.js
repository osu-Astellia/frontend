import { SET_USER } from '../actions/userActions';

export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload: payload
    }
}