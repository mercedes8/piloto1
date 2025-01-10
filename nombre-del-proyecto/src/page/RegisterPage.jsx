import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    const res = await signup(values);
    console.log(res);
  });

  return (
    <div className="container">
      <div className="form-wrapper">
        {/* Mostrar errores de registro si existen */}
        {Array.isArray(registerErrors) && registerErrors.length > 0 && registerErrors.map((error, i) => (
          <div className="error-message" key={i}>
            {error}
          </div>
        ))}
        <h1 className="title">Register</h1>
        <form onSubmit={onSubmit}>
          <input 
            type="text"
            {...register("username", { required: "Username is required" })}
            className="input-field"
            placeholder="Username"
          />
          {errors.username && (
            <p className="input-error">{errors.username.message}</p>
          )}

          <input 
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input-field"
            placeholder="Email"
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}

          <input 
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input-field"
            placeholder="Password"
          />
          {errors.password && (
            <p className="input-error">{errors.password.message}</p>
          )}

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>

        <p className="link-container">
          Ya tiene una cuenta{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
