import { Assignee, TaskBase } from '@/types/api/tasks.ts';

export interface Board {
    id: number;
    name: string;
    description: string;
    taskCount: number;
}

export interface GetBoardsResponse {
    data: Board[];
}

export interface TaskOnBoard extends TaskBase {
    assignee: Assignee;
}

export interface GetBoardResponse {
    data: TaskOnBoard[];
}
