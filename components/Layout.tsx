import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Memoria para el menú

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Sidebar con efecto de desplazamiento en móvil */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out bg-surface-light dark:bg-surface-dark
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 md:flex
            `}>
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
                {/* Header Móvil */}
                <div className="md:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-text-main-light dark:text-white">MTC Admin</span>
                    </div>
                    {/* El botón ahora cambia el estado a true (abierto) */}
                    <button onClick={() => setIsMenuOpen(true)} className="text-text-main-light dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

                {/* Capa oscura decorativa que cierra el menú al tocar fuera */}
                {isMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};