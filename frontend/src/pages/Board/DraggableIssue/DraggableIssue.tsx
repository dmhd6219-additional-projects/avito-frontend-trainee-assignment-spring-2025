import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Issue from '@/components/shared/Issue/Issue.tsx';
import { ColumnKey, IssueType } from '@/pages/Board/Board.tsx';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

type DraggableIssueProps = {
    issue: IssueType;
    columnId: ColumnKey;
};

const DraggableIssue = ({ issue, columnId }: DraggableIssueProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        setActivatorNodeRef,
    } = useDraggable({
        id: issue.id,
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
                <Issue title={issue.title} />
            </div>
        </div>
    );
};

export default DraggableIssue;
