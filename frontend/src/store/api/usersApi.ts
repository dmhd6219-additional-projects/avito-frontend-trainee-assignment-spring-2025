import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetUsersResponse } from '@/types/api/users.ts';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<GetUsersResponse, void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
    }),
});

export const { useGetAllUsersQuery } = usersApi;
