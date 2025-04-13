import { Outlet } from 'react-router-dom';
import Header from './Header/Header.tsx';
import { Providers } from '@/components/shared/providers';

const Layout = () => {
    return (
        <Providers>
            <Header />
            <main className="max-w-[1280px] mx-auto">
                <Outlet />
            </main>
        </Providers>
    );
};

export default Layout;
