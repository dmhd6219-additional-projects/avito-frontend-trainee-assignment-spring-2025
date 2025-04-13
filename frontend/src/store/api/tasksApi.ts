import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    CreateTaskRequest,
    CreateTaskResponse,
    GetAllTasksResponse,
    UpdateTaskRequest,
    UpdateTaskResponse,
    UpdateTaskStatusRequest,
    UpdateTaskStatusResponse,
} from '@/types/api/tasks.ts';

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getAllTasks: builder.query<GetAllTasksResponse, string>({
            query: () => '/tasks',
            providesTags: ['Tasks'],
        }),
        createTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
            query: (body: CreateTaskRequest) => ({
                url: '/tasks/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskRequest>({
            query: ({ taskId, ...body }) => ({
                url: `/tasks/update/${taskId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_res, _err, { taskId }) => [
                'Tasks',
                { type: 'Tasks', id: taskId },
            ],
        }),
        updateTaskStatus: builder.mutation<
            UpdateTaskStatusResponse,
            UpdateTaskStatusRequest
        >({
            query: ({ taskId, status }) => ({
                url: `/tasks/updateStatus/${taskId}`,
                method: 'PUT',
                body: {
                    status: status,
                },
            }),
            invalidatesTags: (_res, _err, { taskId }) => [
                'Tasks',
                { type: 'Tasks', id: taskId },
            ],
        }),
    }),
});

export const {
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateTaskStatusMutation,
} = tasksApi;
