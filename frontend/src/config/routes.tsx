import { RouteObject } from 'react-router-dom';
import { Layout } from '@/pages/Layout';
import { Boards } from '@/pages/Boards';
import { Board } from '@/pages/Board';
import { Issues } from '@/pages/Issues';

const routesConfig: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                element: <Boards />,
                path: '/boards',
            },
            {
                element: <Board />,
                path: '/board/:boardId',
            },
            {
                element: <Issues />,
                path: '/issues',
            },
        ],
    },
];

export default routesConfig;
