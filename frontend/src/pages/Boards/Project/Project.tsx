import { Card } from '@/components/ui/card.tsx';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';

interface ProjectProps {
    name: string;
    id: number;
}

const Project = ({ name, id }: ProjectProps) => {
    return (
        <Card
            className={cn(
                'flex flex-row items-center justify-between',
                'px-4 max-w-4xl',
            )}
        >
            <span>{name}</span>
            <Link to={`/board/${id}`}>Перейти к доске</Link>
        </Card>
    );
};

export default Project;
