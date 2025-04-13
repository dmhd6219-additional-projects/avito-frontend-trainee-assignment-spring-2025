export interface User {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
    description: string;
    teamId: number;
    teamName: string;
    tasksCount: number;
}

export interface GetUsersResponse {
    data: User[];
}
