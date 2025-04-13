import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import EditTaskDialog from '@/components/shared/EditTaskDialog/EditTaskDialog.tsx';
import FiltersDialog from './FiltersDialog/FiltersDialog.tsx';

const Issues = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="w-full flex justify-between items-center">
                <Input placeholder="Поиск" className="w-[300px]" />
                <FiltersDialog />
            </div>
            <div
                className={cn(
                    'flex flex-col items-center gap-y-4',
                    'border-1 rounded-xl w-full p-4',
                )}
            >
                <EditTaskDialog triggerClassName="self-end">
                    <Button>Создать задачу</Button>
                </EditTaskDialog>
            </div>
        </div>
    );
};

export default Issues;
