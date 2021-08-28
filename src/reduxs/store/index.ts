import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers'
import { logger, thunk } from '../middleware';
// And use redux-batch as an example of adding enhancers
import { reduxBatch } from '@manaflair/redux-batch'


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
  enhancers: [reduxBatch],
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch