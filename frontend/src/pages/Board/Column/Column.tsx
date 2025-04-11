import { useDroppable } from '@dnd-kit/core';
import { ColumnKey, IssueType } from '@/pages/Board/Board';
import DraggableIssue from '../DraggableIssue/DraggableIssue';

type ColumnProps = {
    id: ColumnKey;
    title: string;
    items: IssueType[];
};

const Column = ({ id, title, items }: ColumnProps) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 min-h-[200px] rounded">
            <h2 className="font-bold mb-2">{title}</h2>
            <div className="flex flex-col gap-2">
                {items.map((issue) => (
                    <DraggableIssue
                        key={issue.id}
                        issue={issue}
                        columnId={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
