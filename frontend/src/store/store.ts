import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './api/boardsApi';
import { tasksApi } from './api/tasksApi';

export const store = configureStore({
    reducer: {
        [boardsApi.reducerPath]: boardsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            boardsApi.middleware,
            tasksApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
