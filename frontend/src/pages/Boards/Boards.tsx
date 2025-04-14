import { useGetBoardsQuery } from '@/store/api/boardsApi';
import { BoardsSkeleton } from './components/BoardsSkeleton';
import { BoardCard } from './components/BoardCard';

const Boards = () => {
    const { data: boards, isLoading, error } = useGetBoardsQuery();

    if (error) return <div>Error...</div>;
    if (isLoading || !boards) return <BoardsSkeleton />;

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {boards.data.map((board) => (
                <BoardCard key={board.id} board={board} />
            ))}
        </div>
    );
};

export default Boards;
