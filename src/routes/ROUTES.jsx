import {createBrowserRouter} from "react-router-dom";

import Login from "../pages/LoginPage/index.jsx";
import SuperAdminPage from "../pages/AdminPages/SuperAdminPage/index.jsx";
import AdminCompanies from "../pages/AdminPages/AdminCompanies/index.jsx";
import AdminCategories from "../pages/AdminPages/AdminCategories/index.jsx";
import AdminProducts from "../pages/AdminPages/AdminProducts/index.jsx";
import AdminKassaE from "../pages/AdminPages/AdminKassaE/index.jsx";
import KassaEmeliyyati from "../pages/AdminPages/KassaEmeliyyati/index.jsx";
import AdminKassaEAdd from "../pages/AdminPages/AdminKassaEAdd/index.jsx";

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
            },
            {
                path:'/admin/emeliyyat/kassa-e',
                element:<AdminKassaE/>
            },
            {
                path:'/admin/emeliyyat/kassa-e/:id',
                element:<KassaEmeliyyati/>
            },
            {
                path:'/admin/emeliyyat/kassa-e/add/:id',
                element:<AdminKassaEAdd/>
            }
        ]
    }
]);

export default router;
