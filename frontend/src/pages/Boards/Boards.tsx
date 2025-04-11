import Project from './Project/Project.tsx';

const Boards = () => {
    return (
        <div className="flex flex-col gap-y-4">
            {Array.from({ length: 10 }).map(() => (
                <Project />
            ))}
        </div>
    );
};

export default Boards;
