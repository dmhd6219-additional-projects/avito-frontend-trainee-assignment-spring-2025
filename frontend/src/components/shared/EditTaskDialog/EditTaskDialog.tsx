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
import { Label } from '@/components/ui/label';
import { TaskOnBoard } from '@/types/api/board';
import { useState } from 'react';
import {
    TASK_PRIORITY_VALUES,
    TASK_STATUS_VALUES,
    TaskPriority,
    TaskStatus,
} from '@/types/api/tasks.ts';
import { Link } from 'react-router-dom';
import { useGetBoardsQuery } from '@/store/api/boardsApi.ts';
import { useGetAllUsersQuery } from '@/store/api/usersApi.ts';

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
    const { data: boards } = useGetBoardsQuery();
    const { data: users } = useGetAllUsersQuery();

    const [name, setName] = useState<string>(task?.title || '');
    const [desc, setDesc] = useState<string>(task?.description || '');
    const [board, setBoard] = useState<string | undefined>(
        boardId ? boardId.toString() : '',
    );
    const [priority, setPriority] = useState<TaskPriority | undefined>(
        task?.priority,
    );
    const [status, setStatus] = useState<TaskStatus | undefined>(task?.status);

    return (
        <Dialog>
            <DialogTrigger className={triggerClassName} asChild>
                {children}
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="pb-4">
                        {task ? 'Редактирование' : 'Создание'} задачи
                    </DialogTitle>
                    <DialogDescription className="flex flex-col gap-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Название</Label>
                            <Input
                                placeholder="Введите название"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label>Описание</Label>
                            <Textarea
                                placeholder="Введите описание"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label>Доска</Label>
                            <Select
                                disabled={!!task}
                                onValueChange={(value: string) =>
                                    setBoard(value)
                                }
                                value={board}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите доску" />
                                </SelectTrigger>
                                {boards && (
                                    <SelectContent>
                                        {boards.data.map((board) => (
                                            <SelectItem
                                                key={board.id}
                                                value={board.id.toString()}
                                            >
                                                {board.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                )}
                            </Select>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label>Приоритет</Label>
                            <Select
                                onValueChange={(value: TaskPriority) =>
                                    setPriority(value)
                                }
                                value={priority}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите приоритет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TASK_PRIORITY_VALUES.map((priority) => (
                                        <SelectItem
                                            key={priority}
                                            value={priority}
                                        >
                                            {priority}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label>Статус</Label>
                            <Select
                                onValueChange={(value: TaskStatus) =>
                                    setStatus(value)
                                }
                                value={status}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите статус" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TASK_STATUS_VALUES.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label>Исполнитель</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите исполнителя" />
                                </SelectTrigger>
                                {users && (
                                    <SelectContent>
                                        {users.data.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id.toString()}
                                            >
                                                {user.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                )}
                            </Select>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2 w-full flex flex-row items-center justify-between">
                    <DialogClose>
                        {boardId && (
                            <Button asChild variant="secondary">
                                <Link to={`/board/${boardId}`}>
                                    Перейти на доску
                                </Link>
                            </Button>
                        )}
                    </DialogClose>
                    <Button>{task ? 'Обновить' : 'Создать'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog;
