import {createBrowserRouter} from "react-router-dom";

import Login from "../pages/LoginPage/index.jsx";
import SuperAdminPage from "../pages/AdminPages/SuperAdminPage/index.jsx";
import AdminCompanies from "../pages/AdminPages/AdminCompanies/index.jsx";
import AdminCategories from "../pages/AdminPages/AdminCategories/index.jsx";
import AdminProducts from "../pages/AdminPages/AdminProducts/index.jsx";

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
                element:<AdminCompanies/>
            },
            {
                path:'/admin/companies/:id',
                element:<AdminCategories/>
            },
            {
                path:'/admin/companies/category/:id',
                element:<AdminProducts/>
            }
        ]
    }
]);

export default router;
