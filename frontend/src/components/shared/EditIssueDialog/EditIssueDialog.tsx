import * as React from 'react';
import {
    Dialog,
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

interface EditIssueProps {
    children: React.ReactNode;
    issue?: Record<string, string>;
}

const EditIssueDialog = ({ children, issue }: EditIssueProps) => {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-4">
                        {issue ? 'Редактирование' : 'Создание'} задачи
                    </DialogTitle>
                    <DialogDescription className="flex flex-col gap-y-4">
                        <Input placeholder="Название" />
                        <Textarea placeholder="Описание" />
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

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Приоритет" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
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
                    <Button disabled>Перейти на доску</Button>
                    <Button>{issue ? 'Обновить' : 'Создать'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditIssueDialog;
