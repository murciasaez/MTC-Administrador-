import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Añadimos onClose a las propiedades para poder cerrar el menú desde el móvil
interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Función para manejar clics en los enlaces (navegar y cerrar menú en móvil)
  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <aside className="flex h-full w-72 flex-col justify-between border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 z-10">
      <div className="flex flex-col gap-6">
        {/* Brand y Botón de cerrar (solo móvil) */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
            <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-border-light dark:border-border-dark" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxu9EkLqT07tjHxyYuv0HoA6AcQR5raju14pztlFheaipgCCFrezB2TqhVzjWCCB-6M6JGxzNMFWiJpTA17FwqUKzhPpyPyXIwUsL1SZbVultWD5xD4ABu5XrfDfIU0Sg1Q53623QCjDXUbpPjhhbilUweC1m-FrnoSK9T11KGA_bvbml3z4l0wCHVss5fBsHu8tZHJLnLDTYtq4LIvIV2f8_OaeAa60ElZjpt6bUwJFhG60-tmo-ljqzJZQDZ_0U_Y4TEIpTkBi0")'}}>
            </div>
            <div className="flex flex-col">
              <h1 className="text-text-main-light dark:text-white text-base font-bold leading-tight">MTC Admin</h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Gestión Clínica</p>
            </div>
          </div>
          
          {/* Botón X para cerrar (solo aparece si existe onClose, es decir, en móvil) */}
          {onClose && (
            <button onClick={onClose} className="md:hidden text-text-secondary-light dark:text-text-secondary-dark">
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => handleNavigation('/dashboard')} 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/dashboard') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}
          >
            <span className={`material-symbols-outlined ${isActive('/dashboard') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>calendar_today</span>
            <span className="text-sm font-bold">Agenda</span>
          </button>

          <button 
            onClick={() => handleNavigation('/Pacientes')} 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/Pacientes') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}
          >
            <span className={`material-symbols-outlined ${isActive('/Pacientes') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>person</span>
            <span className="text-sm font-medium">Pacientes</span>
          </button>

          <button 
            onClick={() => handleNavigation('/new-appointment')} 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/new-appointment') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}
          >
            <span className={`material-symbols-outlined ${isActive('/new-appointment') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>add_circle</span>
            <span className="text-sm font-medium">Nueva Cita</span>
          </button>

          <button 
            onClick={() => handleNavigation('/settings')} 
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${isActive('/settings') ? 'bg-primary/10 text-text-main-light dark:text-white' : 'hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white'}`}
          >
            <span className={`material-symbols-outlined ${isActive('/settings') ? 'text-green-700 dark:text-primary icon-filled' : ''}`}>settings</span>
            <span className="text-sm font-medium">Configuración</span>
          </button>
        </nav>
      </div>

      {/* Bottom User */}
      <div className="flex flex-col gap-2 border-t border-border-light dark:border-border-dark pt-4">
        <button 
          onClick={() => handleNavigation('/dashboard')} 
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark/50 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-main-light dark:hover:text-white transition-colors text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
        
        <div className="flex items-center gap-3 px-3 py-2 mt-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-green-800 dark:text-primary font-bold text-xs">Dr.</div>
          <div className="flex flex-col">
            <p className="text-text-main-light dark:text-white text-xs font-bold">Dra. Isabel Murcia</p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-[10px]">Acupuntor Jefe</p>
          </div>
        </div>
      </div>
    </aside>
  );
};