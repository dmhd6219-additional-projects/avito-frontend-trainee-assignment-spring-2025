import { Outlet } from 'react-router-dom';
import Header from './Header/Header.tsx';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="max-w-[1280px] mx-auto">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
