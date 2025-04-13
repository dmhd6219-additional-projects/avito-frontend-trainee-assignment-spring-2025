export interface Assignee {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
}

export type TaskPriority = 'Low' | 'Medium' | 'High';
export const TASK_PRIORITY_VALUES: TaskPriority[] = ['Low', 'Medium', 'High'];
export type TaskStatus = 'Backlog' | 'InProgress' | 'Done';
export const TASK_STATUS_VALUES: TaskStatus[] = [
    'Backlog',
    'InProgress',
    'Done',
];

export interface TaskBase {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
}

export interface GetTaskByIDResponse extends TaskBase {
    boardName: string;
    assignee: Assignee;
}

export interface GetTasksResponse extends TaskBase {
    boardId: number;
    boardName: string;
    assignee: Assignee;
}

export interface CreateTaskRequest {
    assigneeId: number;
    boardId: number;
    description: string;
    title: string;
    priority?: TaskPriority;
}

export interface CreateTaskResponse {
    id: number;
}

export interface UpdateTaskRequest {
    assigneeId: number;
    description: string;
    title: string;
    priority?: TaskPriority;
    status?: TaskStatus;
}

export interface UpdateTaskResponse {
    message: string;
}

export interface UpdateTaskStatusRequest {
    taskId: number;
    status: TaskStatus;
}

export interface UpdateTaskStatusResponse {
    message: string;
}
