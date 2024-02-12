import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root"
import Index from './pages/Index/Index';
import Logout from './pages/Logout';
import Home from './pages/Home/Home';
import Profile from './pages/Profile';
import ProtectedRoute from "./components/ProtectedRoute"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"


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
                element: <ProtectedRoute><Logout /></ProtectedRoute>,
            },
            {
                path: "/home",
                element:  <ProtectedRoute><Home /> </ProtectedRoute>,
            },
            {
                path: "/profile",
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
            },
            // {
            //   path:"",
            //   element:<ProtectedRoute/>
            // }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);