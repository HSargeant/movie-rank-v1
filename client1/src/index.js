import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root.js"
import Index from './pages/Index/Index.js';
import Logout from './pages/Logout.js';
import Home from './pages/Home/Home.js';
import Profile from './pages/Profile.js';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { loader as homeLoader } from './pages/Home/Home.js';
import {loader as profileLoader} from "./pages/Profile.js"

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <QueryClientProvider client={queryClient}><Root /></QueryClientProvider>,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index /> //users will land at the login page
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/home",
                element:  <Home />,
                loader:  homeLoader
            },
            {
                path: "/profile",
                element: <Profile />,
                loader: profileLoader
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);