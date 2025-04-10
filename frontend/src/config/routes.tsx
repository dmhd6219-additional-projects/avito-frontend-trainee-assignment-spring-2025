import { RouteObject } from 'react-router-dom';
import { Root } from '@/pages/Root';
import { Layout } from '@/pages/Layout';

const routesConfig: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                element: <Root />,
                path: '/',
            },
        ],
    },
];

export default routesConfig;
