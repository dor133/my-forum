import { Action, CombinedState, combineReducers } from '@reduxjs/toolkit'
import { rtkApi } from './rtk'

const appReducer = combineReducers({
    [rtkApi.reducerPath]: rtkApi.reducer,
})

const rootReducer = (state: CombinedState<any>, action: Action) => {
    return appReducer(state, action)
}

export default rootReducer
