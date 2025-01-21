import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";
import SearchPage from './page/SearchPage';



import Navbar from "./components/Navbar";  // Importa el Navbar

import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import TasksPage from "./page/TasksPage"; // Página para listar tareas
import TaskFormPage from "./page/TaskFormPage";
import ProfilePage from "./page/ProfilePage";
import AdminPage from "./page/AdminPage";

// Mock de datos de productos para la prueba
const products = [
  { id: 1, name: 'Producto 1', description: 'Descripción 1', category: 'Categoría 1', price: 100 },
  { id: 2, name: 'Producto 2', description: 'Descripción 2', category: 'Categoría 2', price: 200 },
  // Agrega más productos según sea necesario
];


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />  {/* Agrega el Navbar aquí */}
          <Routes>

            <Route path="/search" element={<SearchPage />} />
           
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} /> {/* Página de login */}
            <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
            <Route path="/tasks" element={<TasksPage />} /> {/* Página para listar tareas */}
            <Route path="/add-task" element={<TaskFormPage />} /> {/* Página para añadir una tarea */}
            <Route path="/tasks/:id" element={<TaskFormPage />} /> {/* Editar una tarea */}
            <Route path="/profile" element={<ProfilePage />} /> {/* Página de perfil */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;

//HOLA MERCEDES HICE UN PUSH
