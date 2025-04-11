import { Button } from '@/components/ui/button.tsx';
import { Link, useLocation } from 'react-router-dom';
import EditIssueDialog from '@/components/shared/EditIssueDialog/EditIssueDialog.tsx';
import { cn } from '@/lib/utils.ts';

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
                            location.pathname === '/issues' && 'text-red-500',
                        )}
                    >
                        Все задачи
                    </Link>
                    <Link
                        to="/boards"
                        className={cn(
                            location.pathname.startsWith('/board') &&
                                'text-red-500',
                        )}
                    >
                        Проекты
                    </Link>
                </div>
                <EditIssueDialog>
                    <Button>Создать задачу</Button>
                </EditIssueDialog>
            </div>
        </div>
    );
};

export default Header;
