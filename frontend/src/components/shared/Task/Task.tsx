import EditTaskDialog from '@/components/shared/EditTaskDialog/EditTaskDialog.tsx';
import { TaskOnBoard } from '@/types/api/board.ts';

type TaskProps = {
    task: TaskOnBoard;
    boardId?: number;
};

const Task = ({ task, boardId }: TaskProps) => {
    return (
        <EditTaskDialog
            task={task}
            triggerClassName="w-full cursor-pointer"
            boardId={boardId}
        >
            <div className="border-2 w-full p-2 text-left bg-white rounded shadow-sm">
                <span>{task.title}</span>
            </div>
        </EditTaskDialog>
    );
};

export default Task;
