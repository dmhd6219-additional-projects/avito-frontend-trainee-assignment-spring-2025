import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Providers } from '@/components/shared/Providers';
import { Toaster } from '@/components/ui/sonner';

const Layout = () => {
    return (
        <Providers>
            <Header />
            <main className="max-w-[1280px] mx-auto">
                <Outlet />
            </main>
            <Toaster />
        </Providers>
    );
};

export default Layout;
