import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Signin from "./components/Signin.tsx";
import Signup from "./components/Signup.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signin",
        element: <Signin />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
