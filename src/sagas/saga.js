import { put, takeEvery } from 'redux-saga/effects';
import { INIT_LIST1 } from '../actions/types';
import { initListAction } from '../actions/action';
import axios from 'axios';

function* getInitList () {
    try {
        const res = yield axios.get('/api/list.json');
        console.log(res);
        const action = initListAction(res.data.data);
        yield put(action);
    }
    catch (error) {
        console.error(error)
    }
}

function* mySaga () {
    yield takeEvery(INIT_LIST1, getInitList);
}

export default mySaga;