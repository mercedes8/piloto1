import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  // Si no está autenticado, redirige a login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si está autenticado, muestra el contenido protegido
  return <Outlet />;
}

export default ProtectedRoute;
