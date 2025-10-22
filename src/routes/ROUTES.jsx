import {createBrowserRouter} from "react-router-dom";

import Login from "../pages/LoginPage/index.jsx";
import SuperAdminPage from "../pages/AdminPages/SuperAdminPage/index.jsx";
import AdminCompanies from "../pages/AdminPages/AdminCompanies/index.jsx";
import AdminCategories from "../pages/AdminPages/AdminCategories/index.jsx";
import AdminProducts from "../pages/AdminPages/AdminMusteriler/index.jsx";
import AdminKassaE from "../pages/AdminPages/AdminKassaE/index.jsx";
import KassaEmeliyyati from "../pages/AdminPages/KassaEmeliyyati/index.jsx";
import AdminKassaEAdd from "../pages/AdminPages/AdminKassaEAdd/index.jsx";
import AdminBorcE from "../pages/AdminPages/AdminBorcE/index.jsx";
import BorcEmeliyyati from "../pages/AdminPages/BorcEmeliyyati/index.jsx";
import AdminBorcEAdd from "../pages/AdminPages/AdminBorcEAdd/index.jsx";
import AdminKassaH from "../pages/AdminPages/AdminKassaH/index.jsx";
import AdminBorcH from "../pages/AdminPages/AdminBorcH/index.jsx";
import KassaHesabati from "../pages/AdminPages/KassaHesabati/index.jsx";
import BorcHesabati from "../pages/AdminPages/BorcHesabati/index.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import AdminMusteriE from "../pages/AdminPages/AdminMusteriE/index.jsx";
import AdminMusteriler from "../pages/AdminPages/AdminMusteriler/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <SuperAdminPage/>
            </ProtectedRoute>
        ),
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
            },
            {
                path:'/admin/emeliyyat/borc-e',
                element:<AdminBorcE/>
            },
            {
                path:'/admin/emeliyyat/borc-e/:id',
                element:<BorcEmeliyyati/>
            },
            {
                path:'/admin/emeliyyat/borc-e/add/:id',
                element:<AdminBorcEAdd/>
            },
            {
                path:'/admin/hesabat/kassa-h',
                element:<AdminKassaH/>
            },
            {
                path:'/admin/hesabat/borc-h',
                element:<AdminBorcH/>
            },
            {
                path:'/admin/hesabat/kassa-h/:id',
                element:<KassaHesabati/>
            },
            {
                path:'/admin/hesabat/borc-h/:id',
                element:<BorcHesabati/>
            },
            {
                path:'/admin/musteri',
                element:<AdminMusteriE/>
            },
            {
                path:'/admin/musteri/:id',
                element:<AdminMusteriler/>
            },
        ]
    }
]);

export default router;
