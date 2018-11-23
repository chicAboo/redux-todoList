import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';

//无状态组件
const TodoListUI = (props) => (
    <div className="box">
        <div>
            <Input className="input"
                   placeholder="TodoList info..."
                   value={props.inputValue}
                   onChange={props.handleChangeInput}
            />
            <Button type="primary" onClick={props.handleSubmitItem}>提交</Button>
        </div>
        <List
            className="list"
            bordered
            dataSource={props.data}
            renderItem={(item, index) => (<List.Item
                onClick={() => props.handleDeleteItem(index)}
            >{item}</List.Item>)}
        />
    </div>
);

export default TodoListUI;
