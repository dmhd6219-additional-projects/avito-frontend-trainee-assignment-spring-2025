export interface Assignee {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
}

export const TASK_PRIORITY_VALUES = ['Low', 'Medium', 'High'] as const;
export type TaskPriority = (typeof TASK_PRIORITY_VALUES)[number];

export const TASK_STATUS_VALUES = ['Backlog', 'InProgress', 'Done'] as const;
export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

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

export interface TaskOnAllTasks extends TaskBase {
    boardId: number;
    boardName: string;
    assignee: Assignee;
}

export interface GetAllTasksResponse {
    data: TaskOnAllTasks[];
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
    taskId: number;
    assigneeId: number;
    description: string;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
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
