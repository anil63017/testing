import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utility/context/AuthContext';


function ProtectedRoute() {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? (
        <Outlet />
    )
        : <Navigate to='/login' />
}

export default ProtectedRoute;