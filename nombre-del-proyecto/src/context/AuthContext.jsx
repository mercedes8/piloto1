import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { registerRequest, loginRequest, verityTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (userData) => {
        setErrors([]);  // Limpia los errores antes de hacer la petición
        
        if (!userData.username || !userData.email || !userData.password) {
            setErrors(['Todos los campos son obligatorios.']);
            return;
        }

        try {
            const res = await registerRequest(userData);
            console.log("Registro exitoso:", res.data);
        } catch (error) {
            const errorMessage = error.response?.data || ['Ocurrió un error inesperado'];
            setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
        }
    };

    const signin = async (userData) => {
        if (!userData.email || !userData.password) {
            setErrors(['El correo electrónico y la contraseña son obligatorios.']);
            return;
        }

        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            Cookies.set("token", res.data.token);
        } catch (error) {
            const errorMessage = error.response?.data || ['Ocurrió un error inesperado'];
            setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    // clearErrors utilizando useCallback para evitar redefiniciones
    const clearErrors = useCallback(() => {
        setErrors([]);
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get("token");
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const res = await verityTokenRequest(token);
                if (res.data) {
                    setIsAuthenticated(true);
                    setUser(res.data);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            clearErrors,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            {loading ? <div className="loading">Cargando...</div> : children}
        </AuthContext.Provider>
    );
};
