import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EditTaskDialog from '@/components/shared/EditTaskDialog/EditTaskDialog.tsx';
import FiltersDialog from './FiltersDialog/FiltersDialog.tsx';
import { useGetAllTasksQuery } from '@/store/api/tasksApi.ts';
import Task from '@/components/shared/Task/Task.tsx';

const Issues = () => {
    const { data: tasks, isLoading, error } = useGetAllTasksQuery('');

    if (error) return <div>Error...</div>;
    if (isLoading || !tasks) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="w-full flex justify-between items-center">
                <Input placeholder="Поиск" className="w-[300px]" />

                <div className="flex items-center gap-x-2">
                    <FiltersDialog />
                    <EditTaskDialog triggerClassName="self-end">
                        <Button>Создать задачу</Button>
                    </EditTaskDialog>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
                {tasks.data.map((task) => (
                    <Task task={task} big />
                ))}
            </div>
        </div>
    );
};

export default Issues;
