import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { EditTaskDialog } from '@/components/shared/EditTaskDialog';

const Header = () => {
    const location = useLocation();

    return (
        <div
            className={cn(
                'sticky top-0 z-50 bg-white',
                'flex items-center justify-between',
                'border-b mb-2',
            )}
        >
            <div
                className={cn(
                    'flex items-center justify-between',
                    'w-full max-w-[1280px] mx-auto py-2',
                )}
            >
                <div className="flex items-center gap-x-4">
                    <Link
                        to="/issues"
                        className={cn(
                            location.pathname === '/issues' && 'text-blue-500',
                        )}
                    >
                        Все задачи
                    </Link>
                    <Link
                        to="/boards"
                        className={cn(
                            location.pathname.startsWith('/board') &&
                                'text-blue-500',
                        )}
                    >
                        Проекты
                    </Link>
                </div>
                <EditTaskDialog>
                    <Button>Создать задачу</Button>
                </EditTaskDialog>
            </div>
        </div>
    );
};

export default Header;
