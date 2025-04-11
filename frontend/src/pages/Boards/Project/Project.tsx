import { Card } from '@/components/ui/card.tsx';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';

const Project = () => {
    return (
        <Card
            className={cn(
                'flex flex-row items-center justify-between',
                'px-4 max-w-4xl',
            )}
        >
            <span>Название проекта</span>
            <Link to="/board/1">Перейти к доске</Link>
        </Card>
    );
};

export default Project;
