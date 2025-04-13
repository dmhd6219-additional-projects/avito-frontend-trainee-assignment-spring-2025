import { useDroppable } from '@dnd-kit/core';
import DraggableTask from '@/pages/Board/DraggableTask/DraggableTask.tsx';
import { TaskStatus } from '@/types/api/tasks.ts';
import { TaskOnBoard } from '@/types/api/board.ts';

type ColumnProps = {
    boardId: number;
    id: TaskStatus;
    title: string;
    items: TaskOnBoard[];
};

const Column = ({ id, title, items, boardId }: ColumnProps) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 min-h-[200px] rounded">
            <h2 className="font-bold mb-2">{title}</h2>
            <div className="flex flex-col gap-2">
                {items.map((task) => (
                    <DraggableTask
                        boardId={boardId}
                        key={task.id}
                        task={task}
                        columnId={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
