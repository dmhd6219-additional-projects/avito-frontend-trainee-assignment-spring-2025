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

import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TaskOnBoard } from '@/types/api/board.ts';
import { useState } from 'react';
import {
    TASK_PRIORITY_VALUES,
    TASK_STATUS_VALUES,
    TaskPriority,
    TaskStatus,
} from '@/types/api/tasks.ts';

interface EditTaskProps {
    children: React.ReactNode;
    triggerClassName?: string;
    task?: TaskOnBoard;
    boardId?: number;
}

const EditTaskDialog = ({
    children,
    triggerClassName,
    task,
    boardId,
}: EditTaskProps) => {
    const [name, setName] = useState<string>(task?.title || '');
    const [desc, setDesc] = useState<string>(task?.description || '');

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
                        <Input
                            placeholder="Название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Textarea
                            placeholder="Описание"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Проект" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value: TaskPriority) =>
                                setPriority(value)
                            }
                            defaultValue={priority}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Приоритет" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_PRIORITY_VALUES.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value: TaskStatus) =>
                                setStatus(value)
                            }
                            defaultValue={status}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_STATUS_VALUES.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Исполнитель" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2 w-full flex flex-row items-center justify-between">
                    <DialogClose>
                        <Button disabled={!boardId}>Перейти на доску</Button>
                    </DialogClose>
                    <Button>{task ? 'Обновить' : 'Создать'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog;
