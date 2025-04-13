import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './api/boardsApi';
import { tasksApi } from './api/tasksApi';
import issuesFiltersReducer from './slices/issuesFiltersSlice';
import { usersApi } from '@/store/api/usersApi.ts';

export const store = configureStore({
    reducer: {
        filters: issuesFiltersReducer,
        [boardsApi.reducerPath]: boardsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            boardsApi.middleware,
            tasksApi.middleware,
            usersApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
