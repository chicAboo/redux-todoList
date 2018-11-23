import { CHANGE_INPUT_VALUE, SUBMIT_BTN_ITEM, DELETE_ITEM, INIT_LIST, INIT_LIST1 } from './types';

//输入框改变值
export const changeInputValue = (inputValue) => ({
    type: CHANGE_INPUT_VALUE,
    inputValue
});

//提交
export const submitItemAction = () => ({
    type: SUBMIT_BTN_ITEM
});

//删除
export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
});

export const initList = () => ({
    type: INIT_LIST1
});

export const initListAction = (data) => ({
    type: INIT_LIST,
    data
});


