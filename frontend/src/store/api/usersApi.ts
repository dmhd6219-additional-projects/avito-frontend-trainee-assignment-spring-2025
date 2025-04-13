import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetUsersResponse } from '@/types/api/users.ts';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<GetUsersResponse, void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        getUserTasks: builder.query({
            query: (userId) => `/users/${userId}/tasks`,
            providesTags: (_res, _err, userId) => [
                { type: 'Users', id: userId },
            ],
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUserTasksQuery } = usersApi;
