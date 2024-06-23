import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from 'react-router-dom';
import CameraPage from './pages/camera/CameraPage';

const Layout: React.FC = () => {
    return (
        <div>
            <>header</>
            <Outlet />
            <>footer</>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/camera",
                element: <CameraPage />,
            },

        ],
    },
]);

createRoot(document.getElementById('root')! as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
