import Project from './Project/Project.tsx';
import { useGetBoardsQuery } from '@/store/api/boardsApi.ts';

const Boards = () => {
    const { data: boards, isLoading, error } = useGetBoardsQuery('');

    if (error) return <div>Error...</div>;
    if (isLoading || !boards) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-y-4">
            {boards.data.map((board) => (
                <Project name={board.name} id={board.id} key={board.id} />
            ))}
        </div>
    );
};

export default Boards;
