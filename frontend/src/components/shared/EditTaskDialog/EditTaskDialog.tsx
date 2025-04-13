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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TaskOnBoard } from '@/types/api/board';
import { TASK_PRIORITY_VALUES, TASK_STATUS_VALUES } from '@/types/api/tasks.ts';
import { Link } from 'react-router-dom';
import { useGetBoardsQuery } from '@/store/api/boardsApi.ts';
import { useGetAllUsersQuery } from '@/store/api/usersApi.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editTaskFormSchema } from '@/types/schemas/editTaskFormSchema.ts';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    useCreateTaskMutation,
    useUpdateTaskMutation,
} from '@/store/api/tasksApi';
import { omit } from 'lodash';

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
            });
            return;
        }

        updateTask({
            taskId: Number(task.id),
            ...values,
            ...omit(values, 'boardId'),
            assigneeId: Number(values.assigneeId),
        });
        localStorage.removeItem(DRAFT_KEY);
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
                            <DialogTitle className="pb-4">
                                {task ? 'Редактирование' : 'Создание'} задачи
                            </DialogTitle>

                            <DialogDescription className="flex flex-col gap-y-4">
                                {wasRestoredFromDraft && (
                                    <div className="text-sm text-muted-foreground">
                                        Некоторые значения были восстановлены из
                                        черновика
                                    </div>
                                )}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="grid w-full items-center gap-1.5">
                                            <FormLabel>Название</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Введите название"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="grid w-full items-center gap-1.5">
                                            <FormLabel>Описание</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Введите описание"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="boardId"
                                    render={({ field }) => (
                                        <FormItem className="grid w-full items-center gap-1.5">
                                            <FormLabel>Доска</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={!!task}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите доску" />
                                                    </SelectTrigger>
                                                    {boards && (
                                                        <SelectContent
                                                            ref={field.ref}
                                                        >
                                                            {boards.data.map(
                                                                (board) => (
                                                                    <SelectItem
                                                                        key={
                                                                            board.id
                                                                        }
                                                                        value={board.id.toString()}
                                                                    >
                                                                        {
                                                                            board.name
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem className="grid w-full items-center gap-1.5">
                                            <FormLabel>Приоритет</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите приоритет" />
                                                    </SelectTrigger>
                                                    <SelectContent
                                                        ref={field.ref}
                                                    >
                                                        {TASK_PRIORITY_VALUES.map(
                                                            (priority) => (
                                                                <SelectItem
                                                                    key={
                                                                        priority
                                                                    }
                                                                    value={
                                                                        priority
                                                                    }
                                                                >
                                                                    {priority}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="grid w-full items-center gap-1.5">
                                            <FormLabel>Статус</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите статус" />
                                                    </SelectTrigger>
                                                    <SelectContent
                                                        ref={field.ref}
                                                    >
                                                        {TASK_STATUS_VALUES.map(
                                                            (status) => (
                                                                <SelectItem
                                                                    key={status}
                                                                    value={
                                                                        status
                                                                    }
                                                                >
                                                                    {status}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="assigneeId"
                                    render={({ field }) => (
                                        <FormItem className="grid w-full items-center gap-1.5">
                                            <FormLabel>Исполнитель</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите исполнителя" />
                                                    </SelectTrigger>
                                                    {users && (
                                                        <SelectContent
                                                            ref={field.ref}
                                                        >
                                                            {users.data.map(
                                                                (user) => (
                                                                    <SelectItem
                                                                        key={
                                                                            user.id
                                                                        }
                                                                        value={user.id.toString()}
                                                                    >
                                                                        {
                                                                            user.fullName
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
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
                            <DialogClose>
                                <Button type="submit">
                                    {task ? 'Обновить' : 'Создать'}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog;
