import { Skeleton } from '@/components/ui/skeleton.tsx';

const IssuesSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="w-full flex justify-between items-center">
                <Skeleton className="w-[300px] h-9 rounded" />

                <div className="flex items-center gap-x-2">
                    <Skeleton className="w-[141.06px] h-9 rounded" />
                    <Skeleton className="w-[131.53px] h-9 rounded" />
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3">
                {Array.from({ length: 15 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="w-[423px] h-[132px] rounded-2xl"
                    />
                ))}
            </div>
        </div>
    );
};

export default IssuesSkeleton;
