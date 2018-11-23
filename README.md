## 初衷
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux的学习，让人又爱又狠，爱它状态管理的便捷，恨它的文档让人一脸懵逼。总之学习Redux的过程痛并快乐着。为什么要些这篇文章？经历了从Redux文档一步一步爬过来，踩了无数地雷，死了无数脑细胞，连亲爱的头发也一天天离我远去，终于神功大成...。话说当年，文档已烂熟于心，本以为从此React江湖任我游，不想，刚出门就差点撞死在`Action`的门口；好不容易，将货(`data`),开着兰博基尼(`dispatch`)送到了仓库(`store`),不曾想，一堆相同的烂货(`initState`),陈列在仓库，散发着腐朽的味道，苍蝇呜呜呜的拍打着翅膀，仿佛在嘲笑着~~傻逼傻逼~~。拖着疲惫的步伐将货更换完成(`reducer`),开心的骑着电动小马达，越行越远...
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;写文章的目的为了记录学习新技术的心路历程，以及对当前学习技术的一个总结。顺便带着，如果正在学习，正在看的你有一点点帮助，那么人生便已圆满，废话已经写了这么多，如果不喜欢，欢迎来喷。一直坚信，做技术的，如果不在被喷中成长，就在喷子的口水中变成泼妇。

------------------------------

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上一篇文章讲到使用react实现todoList,使用react做一些简单的页面交互可行，如果页面上的功能比较复杂，多组件之间的交互频繁，只是用react会使整个程序变得非常复杂，不利于维护，可能做到后面自己都不清楚数据是怎么走向的。怎么办呢？2014年Facebook就提出了Flux架构的概念，引发了一系列的实现。2015年，Redux的出现，将Flux与函数式变成结合在一起，很快就成为了前端的热门框架。
   Redux是什么，其实Redux就是React的状态管理工具，当然React状态管理工具不止Redux，比如Mobx等，个人觉得使用Mobx更简单，本文主要介绍如何使用Redux一步一步使用页面功能开发，如果没有React基础，请看罗到官网，再到上一篇文章`React的增删功能-todoList实现`。文章中会简单如何使用阿里的ReactUI组件antd。本文主要讲如何使用Redux管理React的状态，不会涉及太多的原理，想看原理，为啥不直接到官网去，带图的、彩色的、各国的都有，看的你不能自我、欲罢不能。

### 一、准备工作
脚手架使用`create-react-app`, 不清楚如何安装，请看上一篇文章。
安装Redux: `npm install -S redux`

### 二、Redux知识总览
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux管理React状态的步骤。`Action`描述事件简单对象，它是改变`store`中`state`的
一方法，通过`store.dispatch()`方法将`Action`传到`store`中。`Action`的作用只是传递数据，并没有更新数据，如何更新数据
`Reducer`的工作。`Reducer`接收到`Action`传入的对应数据，更新数据后返回到store，更新页面。简化来讲，`用户触发事件 ->
action(dispatch分发) -> store -> Reducer更新数据 -> 返回更新后的数据到store -> 更新页面`。如下图：
    img

### 三、Redux实现TodoList

###### 1. Action
`Action`是把数据从应用传到`store`的有效载荷，它是`store`的`唯一`来源。通过`store.dispatch()`将数据传到`store`
`Action`是一个对象，里面必须有属性`type`,type是一个常量,type的作用是数据在Reducer中对应匹配数据使用。在这里我们可以思考下
每一个`Action`都会有对应的type，那么一个网站必然会有很多的type，便于后期维护，最好把type放到统一的文件夹中进行管理。
   `Action`是一个对象，type表示Action的名称。

     {
        type: INIT_LIST,
        paylod: data
     }
上面的代码，Action的名称是`INIT_LIST`,它携带的信息是`data`数据。

###### 2. Action Creator
View要发多少种信息，就会有多少个Action，如果每个都要写，那么会很麻烦，也不利于维护。使用ActionCreator.js统一管理所有的Action。同时Action的名称type，统一使用ActionTypes.js管理。名称可以随便取，不做强求。

    const INIT_LIST = 'init_list';
    export const initListAction = (data) => ({
        type: INIT_LIST,
        data
    });

上面的代码`initListAction`函数就是一个Action。

###### 3. store.dispatch()
store.dispatch()是View发出Action的唯一方法。

    import { createStore } from 'redux';
    const store = createStore(fn);

    store.dispatch({
      type: INIT_LIST,
      data: 'test'
    });
上面的代码，`store.dispatch`接收一个Action对象作为参数，发送给store。
结合`initListAction`，可改写成：

    store.dispatch(initListAction(data));

###### 4. Reducer
Store收到Action后，必须给出新的state，这样View才能发生变化，计算state的过程交Reducer。
Reducer是一个纯函数，即有什么样的输入就有什么样的输出。Reducer的写法如下：

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
上面代码中，type放在公用的文件夹中管理，Action的type和Reduce的type必须一致。
因会有很多Action，故使用switch的方式。如果case下面的数据比较复杂，可以单独提出来进行处理。
`const newState = JSON.parse(JSON.stringify(state));`这句话的作用是深拷贝，目的是如果直接操作state,会影响其他View的数据。

###### 5. Store
Store是保存数据的地方，整个应用只有一个Store。Redux提供了`createStore`函数来生成Store。

    import { createStore } from 'redux';
    const store = createStore(fn);

上面的代码，`createStore`接收另外一个函数作为参数，返回新生成的Store对象。

###### 6. store.subscribe()
`store.subscribe()`是Store的监听函数，一旦state改变，就会自动执行这个函数。

    import { createStore } from 'redux';
    const store = createStore(reducer);

    store.subscribe(listener);
显然，只要把View的更新数据替换上面的`listener`,当state改变时，就能更新数据。
绑定事件监听，完成后需要解除事件，只需执行`listener`就会自动解除监听。

###### 7. store.getState
在View中需要使用state中的数据，使用`store.getState`获取store中state数据，展示到页面即可。

    import { createStore } from 'redux';
    const store = createStore(fn);
    store.getState(state);

### 总结
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里面介绍了Redux一些基础的使用方法，一个完整的项目使用这样的方法，会比较繁琐，那么怎么办呢？下一节会讲到，中间键`redux-saga、redux-thunk`和异步的使用方法，同时会讲到antd UI组建的使用。想看源码请`狠狠的点击这里`。












