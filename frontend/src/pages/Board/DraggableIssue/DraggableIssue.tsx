import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
import Issue from '@/components/shared/Issue/Issue.tsx';
import { ColumnKey, IssueType } from '@/pages/Board/Board.tsx';

type DraggableIssueProps = {
    issue: IssueType;
    columnId: ColumnKey;
};

const DraggableIssue = ({ issue, columnId }: DraggableIssueProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: issue.id,
        data: { columnId },
    });

    const style: React.CSSProperties = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Issue title={issue.title} />
        </div>
    );
};

export default DraggableIssue;
