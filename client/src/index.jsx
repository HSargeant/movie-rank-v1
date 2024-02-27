import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root"
import Index from './pages/Index';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { loader as homeLoader } from './loaders/home';
import { loader as indexLoader } from "./loaders/index"
import { loader as profileLoader } from "./loaders/profile";
import ErrorPage  from './pages/ErrorPage.jsx';
import "./App.css"
import AddMovie from './pages/AddMovie.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <QueryClientProvider client={queryClient}><Root /></QueryClientProvider>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />, //users will land at the login page
                loader: indexLoader
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/home",
                element:  <Home /> ,
                loader: homeLoader
            },
            {
                path: "/profile",
                element: <Profile />,
                loader: profileLoader
            },
            {
                path: "/add",
                element: <AddMovie />,
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