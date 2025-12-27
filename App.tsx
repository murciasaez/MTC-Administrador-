import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Aseguramos que importamos tus pantallas correctamente según tu estructura
import { Sidebar } from './components/Sidebar'; 
import { Dashboard } from './screens/Dashboard';
import { PatientsList } from './screens/PatientsList';
import { NewAppointment } from './screens/NewAppointment';
import { Settings } from './screens/Settings';
import { QuickPatientAdd } from './screens/QuickPatientAdd';

// --- 1. DISEÑO DE LA PANTALLA DE LOGIN (BAMBÚ) ---
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciales: admin@clinica.com / admin123
    if (user === 'admin@clinica.com' && pass === 'admin123') {
      onLogin();
    } else {
      alert('Credenciales incorrectas. Prueba: admin@clinica.com / admin123');
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* IZQUIERDA: IMAGEN DE BAMBÚ */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          alt="Bambú" 
        />
        <div className="relative z-20 p-12 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-500 rounded-lg shadow-lg">
              <span className="material-symbols-outlined text-white text-2xl">spa</span>
            </div>
            <span className="font-bold text-2xl tracking-wide">MTC Administrativo</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">Equilibrio y gestión en un solo lugar.</h1>
          <p className="text-lg text-gray-200 leading-relaxed font-light">
            Plataforma segura para el personal médico. Gestione citas y pacientes con la eficiencia que su práctica merece.
          </p>
          <div className="mt-12 flex items-center gap-2 text-xs text-green-400 font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">verified_user</span> Acceso Seguro Encriptado
          </div>
        </div>
      </div>

      {/* DERECHA: FORMULARIO */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h2>
            <p className="mt-2 text-gray-500">Ingrese sus credenciales para acceder al panel.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400 material-symbols-outlined text-[20px]">person</span>
                <input 
                  type="email" 
                  value={user} 
                  onChange={e => setUser(e.target.value)} 
                  required 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all" 
                  placeholder="admin@clinica.com" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400 material-symbols-outlined text-[20px]">lock</span>
                <input 
                  type="password" 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                  required 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-8">© 2026 Clínica MTC. Sistema de Gestión Interna v2.1</p>
        </div>
      </div>
    </div>
  );
};

// --- 2. LAYOUT PARA LAS PÁGINAS INTERNAS ---
const LayoutConSidebar = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50 dark:bg-black w-full overflow-hidden">
    <Sidebar />
    <main className="flex-1 h-full overflow-hidden flex flex-col relative w-full">
      {children}
    </main>
  </div>
);

// --- 3. APP PRINCIPAL ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA RAÍZ (/): Si no está logueado -> Login. Si SÍ lo está -> Dashboard */}
        <Route path="/" element={!isAuthenticated ? <LoginScreen onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />

        {/* RUTAS PROTEGIDAS */}
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<LayoutConSidebar><Dashboard /></LayoutConSidebar>} />
            <Route path="/pacientes" element={<LayoutConSidebar><PatientsList /></LayoutConSidebar>} />
            <Route path="/new-appointment" element={<LayoutConSidebar><NewAppointment /></LayoutConSidebar>} />
            <Route path="/settings" element={<LayoutConSidebar><Settings /></LayoutConSidebar>} />
            <Route path="/quick-add" element={<LayoutConSidebar><QuickPatientAdd /></LayoutConSidebar>} />
          </>
        )}

        {/* CUALQUIER OTRA RUTA -> REDIRIGIR AL INICIO */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;