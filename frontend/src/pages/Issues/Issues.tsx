import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EditTaskDialog from '@/components/shared/EditTaskDialog/EditTaskDialog.tsx';
import FiltersDialog from './FiltersDialog/FiltersDialog.tsx';
import { useGetAllTasksQuery } from '@/store/api/tasksApi.ts';
import Task from '@/components/shared/Task/Task.tsx';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Issues = () => {
    const { data: tasks, isLoading, error } = useGetAllTasksQuery('');
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

    const debounced = useDebouncedCallback((value: string) => {
        setDebouncedSearchValue(value);
    }, 500);

    if (error) return <div>Error...</div>;
    if (isLoading || !tasks) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="w-full flex justify-between items-center">
                <Input
                    placeholder="Поиск"
                    className="w-[300px]"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        debounced(e.target.value);
                    }}
                />

                <div className="flex items-center gap-x-2">
                    <FiltersDialog />
                    <EditTaskDialog triggerClassName="self-end">
                        <Button>Создать задачу</Button>
                    </EditTaskDialog>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
                {tasks.data
                    .filter((task) =>
                        task.title
                            .toLowerCase()
                            .includes(debouncedSearchValue.toLowerCase()),
                    )
                    .map((task) => (
                        <Task task={task} big />
                    ))}
            </div>
        </div>
    );
};

export default Issues;
