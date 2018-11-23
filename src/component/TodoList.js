import React, { Component } from 'react';
import TodoListUI from './TodoListUI';
import store from '../reducers/index';
import { changeInputValue, submitItemAction, deleteItemAction, initList } from '../actions/action';

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmitItem = this.handleSubmitItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange () {
        this.setState(store.getState());
    }

    handleChangeInput (e) {
        const action = changeInputValue(e.target.value);
        store.dispatch(action);
    }

    handleSubmitItem () {
        const action = submitItemAction();
        store.dispatch(action);
    }

    handleDeleteItem (index) {
        const action = deleteItemAction(index);
        store.dispatch(action);
    }

    componentDidMount () {
        const action = initList();
        store.dispatch(action);
    }

    render () {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                data={this.state.list}
                handleChangeInput={this.handleChangeInput}
                handleSubmitItem={this.handleSubmitItem}
                handleDeleteItem={this.handleDeleteItem}
            />
        )
    }
}

export default TodoList;