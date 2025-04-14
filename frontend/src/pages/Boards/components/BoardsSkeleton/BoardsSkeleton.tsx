import { Skeleton } from '@/components/ui/skeleton';

const BoardsSkeleton = () => {
    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {Array.from({ length: 15 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="w-[316.66px] h-[168px] rounded-2xl"
                />
            ))}
        </div>
    );
};

export default BoardsSkeleton;
