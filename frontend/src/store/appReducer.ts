import { Action, CombinedState, combineReducers } from '@reduxjs/toolkit'
import { rtkApi } from './rtk'
import counterReducer from './test/counterSlice'

const appReducer = combineReducers({
    [rtkApi.reducerPath]: rtkApi.reducer,
    counter: counterReducer,
})

const rootReducer = (state: CombinedState<any>, action: Action) => {
    return appReducer(state, action)
}

export default rootReducer
