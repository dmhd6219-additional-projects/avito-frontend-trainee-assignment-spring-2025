import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FiltersDialog from './FiltersDialog/FiltersDialog';
import { useGetAllTasksQuery } from '@/store/api/tasksApi';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskOnAllTasks } from '@/types/api/tasks';
import { debounce } from 'lodash';
import IssuesSkeleton from './IssuesSkeleton/IssuesSkeleton';
import { Task } from '@/components/shared/Task';
import { EditTaskDialog } from '@/components/shared/EditTaskDialog';

const Issues = () => {
    const filters = useSelector((state: RootState) => state.filters);

    const { data: tasks, isLoading, error } = useGetAllTasksQuery('');
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

    const delayedSearch = useMemo(
        () => debounce((value: string) => setDebouncedSearchValue(value), 500),
        [],
    );

    const filterTasks = (tasks: TaskOnAllTasks[]) => {
        return tasks.filter((task) => {
            const matchesStatus =
                !filters.status || task.status === filters.status;
            const matchesBoard =
                !filters.boardId || task.boardId.toString() === filters.boardId;
            const matchesAssignee =
                !filters.userId ||
                task.assignee.id.toString() === filters.userId;
            const matchesSearch = task.title
                .toLowerCase()
                .includes(debouncedSearchValue.toLowerCase());

            return (
                matchesStatus &&
                matchesBoard &&
                matchesAssignee &&
                matchesSearch
            );
        });
    };

    if (error) return <div>Error...</div>;
    if (isLoading || !tasks) return <IssuesSkeleton />;

    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="w-full flex justify-between items-center">
                <Input
                    placeholder="Поиск по названию"
                    className="w-[300px]"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        delayedSearch(e.target.value);
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
                {filterTasks(tasks.data)
                    .reverse()
                    .map((task) => (
                        <Task
                            task={task}
                            boardId={task.boardId.toString()}
                            big
                        />
                    ))}
            </div>
        </div>
    );
};

export default Issues;
