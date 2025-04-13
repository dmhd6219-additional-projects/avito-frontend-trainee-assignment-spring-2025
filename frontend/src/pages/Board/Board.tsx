import { useEffect, useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import Column from './Column/Column.tsx';
import { useGetBoardTasksQuery } from '@/store/api/boardsApi.ts';
import { useParams } from 'react-router-dom';
import { TASK_STATUS_VALUES, TaskStatus } from '@/types/api/tasks.ts';
import { TaskOnBoard } from '@/types/api/board.ts';
import { useUpdateTaskStatusMutation } from '@/store/api/tasksApi.ts';

type ColumnsState = Record<TaskStatus, TaskOnBoard[]>;

const Board = () => {
    const { boardId } = useParams();
    const {
        data: board,
        isLoading,
        error,
    } = useGetBoardTasksQuery(Number(boardId));
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const [columns, setColumns] = useState<ColumnsState>({
        Backlog: [],
        InProgress: [],
        Done: [],
    });

    useEffect(() => {
        if (!board) return;

        const newColumns: ColumnsState = {
            Backlog: [],
            InProgress: [],
            Done: [],
        };

        for (const task of board.data) {
            newColumns[task.status].push(task);
        }
        setColumns(newColumns);
    }, [board]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.data.current?.columnId === over.id) return;

        const fromColumn = active.data.current?.columnId as TaskStatus;
        const toColumn = over.id as TaskStatus;

        const taskId = Number(active.id);

        const taskToMove = columns[fromColumn].find(
            (task) => task.id === taskId,
        );
        if (!taskToMove) return;

        setColumns((prev) => ({
            ...prev,
            [fromColumn]: prev[fromColumn].filter((task) => task.id !== taskId),
            [toColumn]: [
                ...prev[toColumn],
                { ...taskToMove, status: toColumn },
            ],
        }));

        updateTaskStatus({
            taskId: taskId,
            status: toColumn,
        });
    };

    if (error) return <div>Error...</div>;
    if (isLoading || !board) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-xl mb-4">Название</h1>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-3 gap-4">
                    {TASK_STATUS_VALUES.map((colKey) => (
                        <Column
                            boardId={Number(boardId)}
                            key={colKey}
                            id={colKey}
                            title={colKey}
                            items={columns[colKey]}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default Board;
