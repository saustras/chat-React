import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/registerPage";
import MessagePage from "../components/message";
import Home from "../pages/home/Home";
import Login from "../pages/login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path : "",
                element : <Home/>,
                children : [
                    {
                        path : ':userId',
                        element : <MessagePage/>
                    }
                ]
            }
        ]   
    }
]);

export default router;