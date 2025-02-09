import { configureStore } from '@reduxjs/toolkit';
import TwitterReducer from './features/TwitterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      twitter: TwitterReducer,
    }
  })
}

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>