import { SET_USER } from '../actions/userActions';



export const userReducer = (state = null, action) => {
    switch (action.type) {
        case SET_USER:
            state = action.payload;
            return state;
        default:
            return state;
    }
}