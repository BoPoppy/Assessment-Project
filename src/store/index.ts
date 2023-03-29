import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action, Store } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './saga';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const reducer: typeof rootReducer = (state, action) => {
  return rootReducer(state, action);
};

export const makeStore = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware:
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === 'production'
        ? getDefaultMiddleware({
            serializableCheck: {
              // Ignore these field paths in all actions
              ignoredActionPaths: ['payload.onSuccess', 'payload.onFailed'],
            },
          }).concat(sagaMiddleware)
        : getDefaultMiddleware({
            serializableCheck: {
              // Ignore these field paths in all actions
              ignoredActionPaths: ['payload.onSuccess', 'payload.onFailed'],
            },
          }).concat(sagaMiddleware, logger),
  });

  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

type StoreType = ReturnType<typeof makeStore>;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = StoreType['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
