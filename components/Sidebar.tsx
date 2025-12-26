import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="flex h-full w-72 flex-col justify-between border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 hidden md:flex z-10">
      <div className="flex flex-col gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-border-light dark:border-border-dark" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxu9EkLqT07tjHxyYuv0HoA6AcQR5raju14pztlFheaipgCCFrezB2TqhVzjWCCB-6M6JGxzNMFWiJpTA17FwqUKzhPpyPyXIwUsL1SZbVultWD5xD4ABu5XrfDfIU0Sg1Q53623QCjDXUbpPjhhbilUweC1m-FrnoSK9T11KGA_bvbml3z4l0wCHVss5fBsHu8tZHJLnLDTYtq4LIvIV2f8_OaeAa60ElZjpt6bUwJFhG60-tmo-ljqzJZQDZ_0U_Y4TEIpTkBi0")'}}>
          </div>
          <div className="flex flex-col">
            <h1 className="text-text-main-light dark:text-text-main-dark text-base font-bold leading-tight">MTC Admin</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Gestión Clínica</p>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/dashboard') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}>
            <span className={`material-symbols-outlined ${isActive('/dashboard') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>calendar_today</span>
            <span className="text-sm font-bold">Agenda</span>
          </Link>
          <Link to="/patients" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/patients') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}>
            <span className={`material-symbols-outlined ${isActive('/patients') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>person</span>
            <span className="text-sm font-medium">Pacientes</span>
          </Link>
          <Link to="/new-appointment" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/new-appointment') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}>
            <span className={`material-symbols-outlined ${isActive('/new-appointment') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>add_circle</span>
            <span className="text-sm font-medium">Nueva Cita</span>
          </Link>
            <Link to="/settings" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/settings') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}>
            <span className={`material-symbols-outlined ${isActive('/settings') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>settings</span>
            <span className="text-sm font-medium">Configuración</span>
          </Link>
        </nav>
      </div>
      {/* Bottom User */}
      <div className="flex flex-col gap-2 border-t border-border-light dark:border-border-dark pt-4">
        <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Cerrar Sesión</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 mt-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-green-800 dark:text-primary font-bold text-xs">Dr.</div>
            <div className="flex flex-col">
            <p className="text-text-main-light dark:text-white text-xs font-bold">Dr. Liu Wei</p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-[10px]">Acupuntor Jefe</p>
            </div>
        </div>
      </div>
    </aside>
  );
};