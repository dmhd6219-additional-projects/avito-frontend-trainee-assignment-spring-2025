import { TaskOnBoard } from '@/types/api/board';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { EditTaskDialog } from '@/components/shared/EditTaskDialog';

type TaskProps = {
    task: TaskOnBoard;
    boardId?: string;
    big?: boolean;
};

const Task = ({ task, boardId, big }: TaskProps) => {
    return (
        <EditTaskDialog
            task={task}
            triggerClassName="w-full cursor-pointer"
            boardId={boardId}
        >
            {big ? (
                <Card>
                    <CardHeader>
                        <CardTitle>{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <div className="border-2 w-full p-2 text-left bg-white rounded shadow-sm">
                    <span>{task.title}</span>
                </div>
            )}
        </EditTaskDialog>
    );
};

export default Task;
