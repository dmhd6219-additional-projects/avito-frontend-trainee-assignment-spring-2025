import { TASK_STATUS_VALUES } from '@/types/api/tasks';
import { Skeleton } from '@/components/ui/skeleton';

const BoardSkeleton = () => {
    return (
        <div>
            <h1 className="text-xl mb-4">Название</h1>
            <div className="grid grid-cols-3 gap-4">
                {TASK_STATUS_VALUES.map((_, index) => (
                    <Skeleton
                        key={index}
                        className="w-[316.66px] h-[260px] rounded-2xl"
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardSkeleton;
