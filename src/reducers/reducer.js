import { CHANGE_INPUT_VALUE, SUBMIT_BTN_ITEM, DELETE_ITEM, INIT_LIST } from '../actions/types'

const initialList = {
    inputValue: '',
    list: []
};
const reducerList = (state = initialList, action) => {
    switch (action.type) {
        case CHANGE_INPUT_VALUE:
            const newState = JSON.parse(JSON.stringify(state));
            newState.inputValue = action.inputValue;
            return newState;
        case SUBMIT_BTN_ITEM:
            const submitState = JSON.parse(JSON.stringify(state));
            console.log(submitState);
            submitState.list.push(submitState.inputValue);
            submitState.inputValue = '';
            return submitState;
        case DELETE_ITEM:
            const deleteState = JSON.parse(JSON.stringify(state));
            deleteState.list.splice(action.index);
            return deleteState;
        case INIT_LIST:
            const initState = JSON.parse(JSON.stringify(state));
            initState.list = action.data;
            return initState;
        default:
            return state;
    }
};

export default reducerList;