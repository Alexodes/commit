import { combineReducers } from "redux";

const formReducer = () => {
    return {
        name: 'nothing was submitted',
        phone: 'nothing was submitted',
    }
}

const formSubmitReducer = (formData = formReducer(), action) => {
    if(action.type == 'FORM_SUBMIT') {
        return action.payload;
    }
    return formData;
}

export default combineReducers({
    formSubmitReducer: formSubmitReducer
});
