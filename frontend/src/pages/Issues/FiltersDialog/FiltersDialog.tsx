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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TASK_STATUS_VALUES, TaskStatus } from '@/types/api/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
    setBoardId,
    setStatus,
    setUserId,
} from '@/store/slices/issuesFiltersSlice';
import { useState } from 'react';
import { useGetBoardsQuery } from '@/store/api/boardsApi.ts';
import { useGetAllUsersQuery } from '@/store/api/usersApi.ts';

const FiltersDialog = () => {
    const filters = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();

    const { data: boards } = useGetBoardsQuery();
    const { data: users } = useGetAllUsersQuery();

    const [newStatus, setNewStatus] = useState<TaskStatus | undefined>(
        filters.status,
    );
    const [newBoardId, setNewBoardId] = useState<string | undefined>(
        filters.boardId,
    );
    const [newUserId, setNewUserId] = useState<string | undefined>(
        filters.userId,
    );

    const handleSaveFilters = () => {
        dispatch(setStatus(newStatus));
        dispatch(setBoardId(newBoardId));
        dispatch(setUserId(newUserId));
    };

    const handleResetAllFilters = () => {
        setNewStatus(undefined);
        setNewBoardId(undefined);
        setNewUserId(undefined);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    {filters.status || filters.boardId || filters.userId
                        ? 'Изменить фильтры'
                        : 'Задать фильтры'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-4">Выберите фильтры</DialogTitle>
                    <DialogDescription className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-2">
                            <Select
                                value={newStatus ?? ''}
                                onValueChange={(value: TaskStatus) =>
                                    setNewStatus(value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Статус" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TASK_STATUS_VALUES.map((status) => (
                                        <SelectItem value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={() => setNewStatus(undefined)}>
                                Сбросить
                            </Button>
                        </div>

                        {boards && (
                            <div className="flex items-center gap-x-2">
                                <Select
                                    value={newBoardId ?? ''}
                                    onValueChange={(value: string) =>
                                        setNewBoardId(value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Доска" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {boards.data.map((board) => (
                                            <SelectItem
                                                value={board.id.toString()}
                                            >
                                                {board.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    onClick={() => setNewBoardId(undefined)}
                                >
                                    Сбросить
                                </Button>
                            </div>
                        )}

                        {users && (
                            <div className="flex items-center gap-x-2">
                                <Select
                                    value={newUserId ?? ''}
                                    onValueChange={(value: string) =>
                                        setNewUserId(value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Исполнитель" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.data.map((user) => (
                                            <SelectItem
                                                value={user.id.toString()}
                                            >
                                                {user.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={() => setNewUserId(undefined)}>
                                    Сбросить
                                </Button>
                            </div>
                        )}
                    </DialogDescription>
                    <DialogFooter className="pt-2 w-full flex flex-row items-center justify-end">
                        <Button
                            variant="secondary"
                            onClick={handleResetAllFilters}
                        >
                            Сбросить все фильтры
                        </Button>
                        <DialogClose>
                            <Button onClick={handleSaveFilters}>
                                Сохранить
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default FiltersDialog;
