import * as React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskOnBoard } from '@/types/api/board';
import { Link } from 'react-router-dom';
import { useGetBoardsQuery } from '@/store/api/boardsApi.ts';
import { useGetAllUsersQuery } from '@/store/api/usersApi.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editTaskFormSchema } from '@/types/schemas/editTaskFormSchema.ts';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import {
    useCreateTaskMutation,
    useUpdateTaskMutation,
} from '@/store/api/tasksApi';
import { omit } from 'lodash';
import TitleField from './components/TitleField';
import DescField from './components/DescField';
import BoardField from './components/BoardField';
import PriorityField from './components/PriorityField';
import StatusField from './components/StatusField';
import AssigneeField from './components/AssigneeField';
import { toast } from 'sonner';

interface EditTaskProps {
    children: React.ReactNode;
    triggerClassName?: string;
    task?: TaskOnBoard;
    boardId?: string;
}

const EditTaskDialog = ({
    children,
    triggerClassName,
    task,
    boardId,
}: EditTaskProps) => {
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const { data: boards } = useGetBoardsQuery();
    const { data: users } = useGetAllUsersQuery();

    const form = useForm<z.infer<typeof editTaskFormSchema>>({
        resolver: zodResolver(editTaskFormSchema),
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            boardId: boardId ? boardId.toString() : '',
            priority: task?.priority,
            status: task?.status,
            assigneeId: task ? task.assignee.id.toString() : undefined,
        },
    });

    const DRAFT_KEY = task ? `task-draft-${task.id}` : 'task-draft-new';
    const [isOpen, setIsOpen] = React.useState(false);
    const [wasRestoredFromDraft, setWasRestoredFromDraft] =
        React.useState(false);

    function onSubmit(values: z.infer<typeof editTaskFormSchema>) {
        if (!task) {
            createTask({
                ...values,
                boardId: Number(values.boardId),
                assigneeId: Number(values.assigneeId),
            })
                .then(() => {
                    toast.success(`Задача успешно создана!`);
                })
                .catch(() => {
                    toast.error(`Произошла ошибка при создании задачи.`);
                });
            return;
        }

        updateTask({
            taskId: Number(task.id),
            ...values,
            ...omit(values, 'boardId'),
            assigneeId: Number(values.assigneeId),
        })
            .then(() => {
                localStorage.removeItem(DRAFT_KEY);
                setIsOpen(false);
                toast.success(`Задача успешно обновлена!`);
            })
            .catch(() => {
                toast.error(`Произошла ошибка при обновлении задачи.`);
            });
    }

    React.useEffect(() => {
        const subscription = form.watch((values) => {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
    }, [form, DRAFT_KEY]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (open) {
                    const saved = localStorage.getItem(DRAFT_KEY);
                    if (saved) {
                        try {
                            form.reset(JSON.parse(saved));
                            setWasRestoredFromDraft(true);
                        } catch (e) {
                            console.error(
                                'Не удалось восстановить черновик:',
                                e,
                            );
                        }
                    } else {
                        setWasRestoredFromDraft(false);
                    }
                }
            }}
        >
            <DialogTrigger className={triggerClassName} asChild>
                {children}
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <DialogHeader>
                            <DialogTitle className="pb-4 flex flex-col gap-y-2">
                                <h1>
                                    {task ? 'Редактирование' : 'Создание'}{' '}
                                    задачи
                                </h1>
                                {wasRestoredFromDraft && (
                                    <div className="text-sm text-muted-foreground">
                                        Некоторые значения были восстановлены из
                                        черновика
                                    </div>
                                )}
                            </DialogTitle>

                            <DialogDescription className="flex flex-col gap-y-4">
                                <TitleField control={form.control} />

                                <DescField control={form.control} />

                                <BoardField
                                    control={form.control}
                                    boards={boards}
                                    task={task}
                                />

                                <PriorityField control={form.control} />

                                <StatusField control={form.control} />

                                <AssigneeField
                                    control={form.control}
                                    users={users}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="pt-2 w-full flex flex-row items-center justify-between">
                            <DialogClose asChild>
                                {boardId && (
                                    <Button asChild variant="secondary">
                                        <Link to={`/board/${boardId}`}>
                                            Перейти на доску
                                        </Link>
                                    </Button>
                                )}
                            </DialogClose>
                            <Button type="submit" className="ml-auto">
                                {task ? 'Обновить' : 'Создать'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog;
