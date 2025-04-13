import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Task from '@/components/shared/Task/Task.tsx';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { TaskOnBoard } from '@/types/api/board.ts';

type DraggableTaskProps = {
    task: TaskOnBoard;
    columnId: string;
};

const DraggableTask = ({ task, columnId }: DraggableTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        setActivatorNodeRef,
    } = useDraggable({
        id: task.id.toString(),
        data: { columnId },
    });

    const style: React.CSSProperties = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn('relative flex items-center')}
        >
            <button
                ref={setActivatorNodeRef}
                {...listeners}
                aria-label="Перетащить задачу"
                className="p-1 cursor-grab touch-none mr-2"
            >
                <GripVertical size={16} />
            </button>

            <div className="flex-grow">
                <Task task={task} />
            </div>
        </div>
    );
};

export default DraggableTask;
