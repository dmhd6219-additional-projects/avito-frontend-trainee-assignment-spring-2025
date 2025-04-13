import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBoardResponse, GetBoardsResponse } from '@/types/api/board.ts';

export const boardsApi = createApi({
    reducerPath: 'boardsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1' }),
    tagTypes: ['Boards'],
    endpoints: (builder) => ({
        getBoards: builder.query<GetBoardsResponse, void>({
            query: () => '/boards',
            providesTags: ['Boards'],
        }),
        getBoardTasks: builder.query<GetBoardResponse, number>({
            query: (boardId) => `/boards/${boardId}`,
            providesTags: (_res, _err, boardId) => [
                { type: 'Boards', id: boardId },
            ],
        }),
    }),
});

export const { useGetBoardsQuery, useGetBoardTasksQuery } = boardsApi;
