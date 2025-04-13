import { Link } from 'react-router-dom';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Board } from '@/types/api/board.ts';
import { Button } from '@/components/ui/button.tsx';

interface ProjectProps {
    board: Board;
}

const BoardCard = ({ board }: ProjectProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{board.name}</CardTitle>
                <CardDescription>{board.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild>
                    <Link to={`/board/${board.id}`}>Перейти к доске</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BoardCard;
