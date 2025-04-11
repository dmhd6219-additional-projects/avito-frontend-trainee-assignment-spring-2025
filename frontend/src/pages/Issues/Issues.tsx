import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Issue from '@/components/shared/Issue/Issue';
import { cn } from '@/lib/utils';
import EditIssueDialog from '@/components/shared/EditIssueDialog/EditIssueDialog.tsx';
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
                <Issue />

                <Issue />

                <Issue />

                <EditIssueDialog triggerClassName="self-end">
                    <Button>Создать задачу</Button>
                </EditIssueDialog>
            </div>
        </div>
    );
};

export default Issues;
