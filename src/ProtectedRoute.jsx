import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('tonyByToken');

    if (!token || token === 'null') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
