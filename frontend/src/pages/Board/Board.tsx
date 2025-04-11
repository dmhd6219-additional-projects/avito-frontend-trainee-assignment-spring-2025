import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import Column from './Column/Column.tsx';

// Тип одного issue
export type IssueType = {
    id: string;
    title: string;
};

// Тип ключей колонок
export type ColumnKey = 'todo' | 'inProgress' | 'done';

// Тип состояния всех колонок
type ColumnsState = Record<ColumnKey, IssueType[]>;

const initialColumns: ColumnsState = {
    todo: [{ id: '1', title: 'First Issue' }],
    inProgress: [{ id: '2', title: 'Second Issue' }],
    done: [],
};

const columnTitles: Record<ColumnKey, string> = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
};

const Board = () => {
    const [columns, setColumns] = useState<ColumnsState>(initialColumns);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.data.current?.columnId === over.id) return;

        const fromColumn = active.data.current?.columnId as ColumnKey;
        const toColumn = over.id as ColumnKey;

        const item = columns[fromColumn].find((i) => i.id === active.id);
        if (!item) return;

        setColumns((prev) => ({
            ...prev,
            [fromColumn]: prev[fromColumn].filter((i) => i.id !== active.id),
            [toColumn]: [...prev[toColumn], item],
        }));
    };

    return (
        <div>
            <h1 className="text-xl mb-4">Название</h1>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-3 gap-4">
                    {(Object.keys(columns) as ColumnKey[]).map((colKey) => (
                        <Column
                            key={colKey}
                            id={colKey}
                            title={columnTitles[colKey]}
                            items={columns[colKey]}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default Board;
