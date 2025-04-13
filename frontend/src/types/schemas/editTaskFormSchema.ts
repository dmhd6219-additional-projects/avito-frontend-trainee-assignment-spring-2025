import { z } from 'zod';
import { TASK_PRIORITY_VALUES, TASK_STATUS_VALUES } from '@/types/api/tasks';

export const editTaskFormSchema = z.object({
    title: z
        .string({
            invalid_type_error: 'Поле должно быть строкой',
        })
        .min(3, { message: 'Название должно содержать минимум 3 символа' })
        .max(20, { message: 'Название должно содержать максимум 20 символов' }),

    description: z
        .string({
            invalid_type_error: 'Поле должно быть строкой',
        })
        .min(3, { message: 'Описание должно содержать минимум 3 символа' })
        .max(100, {
            message: 'Описание должно содержать максимум 100 символов',
        }),

    boardId: z.string().min(1, { message: 'Выберите доску' }),

    priority: z.enum(TASK_PRIORITY_VALUES, {
        required_error: 'Выберите приоритет задачи',
        invalid_type_error:
            'Приоритет должен быть одним из: Низкий, Средний, Высокий',
    }),

    status: z.enum(TASK_STATUS_VALUES, {
        required_error: 'Выберите статус задачи',
        invalid_type_error:
            'Статус должен быть одним из: Backlog, InProgress, Done',
    }),

    assigneeId: z
        .string({ required_error: 'Выберите исполнителя задачи' })
        .min(1, { message: 'Выберите исполнителя' }),
});
