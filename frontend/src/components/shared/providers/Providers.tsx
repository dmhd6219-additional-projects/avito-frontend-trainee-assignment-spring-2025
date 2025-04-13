import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

interface ProviderProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Providers;
