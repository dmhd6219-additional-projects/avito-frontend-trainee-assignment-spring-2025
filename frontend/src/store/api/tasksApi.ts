import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    GetAllTasksResponse,
    UpdateTaskStatusRequest,
} from '@/types/api/tasks.ts';

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getAllTasks: builder.query<GetAllTasksResponse, string>({
            query: () => '/tasks',
            providesTags: ['Tasks'],
        }),
        getTaskById: builder.query({
            query: (taskId) => `/tasks/${taskId}`,
            providesTags: (_res, _err, taskId) => [
                { type: 'Tasks', id: taskId },
            ],
        }),
        createTask: builder.mutation({
            query: (body) => ({
                url: '/tasks/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: builder.mutation({
            query: ({ taskId, ...body }) => ({
                url: `/tasks/update/${taskId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_res, _err, { taskId }) => [
                { type: 'Tasks', id: taskId },
            ],
        }),
        updateTaskStatus: builder.mutation({
            query: ({ taskId, status }: UpdateTaskStatusRequest) => ({
                url: `/tasks/updateStatus/${taskId}`,
                method: 'PUT',
                body: {
                    status: status,
                },
            }),
            invalidatesTags: (_res, _err, { taskId }) => [
                { type: 'Tasks', id: taskId },
            ],
        }),
    }),
});

export const {
    useGetAllTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateTaskStatusMutation,
} = tasksApi;
