import { RouterProvider } from 'react-router-dom';
import './App.css';
import Cookies from 'js-cookie';
import router from './routes/ROUTES';




const App = () => {
    const token = Cookies.get('tonyByToken');
    if (!token) {
        Cookies.set('tonyByToken', 'null');
    }

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
