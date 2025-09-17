import {createBrowserRouter} from "react-router-dom";

import Login from "../pages/LoginPage/index.jsx";
import SuperAdminPage from "../pages/SuperAdminPages/SuperAdminPage/index.jsx";
import SuperAdminCompanies from "../pages/SuperAdminPages/SuperAdminCompanies/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
    },
    {
        path: '/admin',
        element: <SuperAdminPage/>,
        children: [
            {
                path: '/admin/companies',
                element:<SuperAdminCompanies/>
            }
        ]
    }
]);

export default router;
