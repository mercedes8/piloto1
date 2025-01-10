import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { signin, errors: signinErrors, isAuthenticated, clearErrors } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await signin(data);
    setLoading(false);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/'); // Redirige a la ruta "/"
    return () => clearErrors(); // Limpia los errores al desmontar el componente o redirigir
  }, [isAuthenticated, navigate, clearErrors]);

  return (
    <div className="container">
      <div className="form-wrapper">
        {/* Muestra errores de inicio de sesión si existen */}
        {signinErrors && signinErrors.length > 0 && signinErrors.map((error, i) => (
          <div className="error-message" key={i}>
            {error}
          </div>
        ))}

        <h1 className="title">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Formato de email no válido"
              }
            })}
            className="input-field"
            placeholder="Email"
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres"
              }
            })}
            className="input-field"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="input-error">{errors.password.message}</p>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="link-container">
          ¿No tienes una cuenta? <Link to="/register" className="signup-link">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
