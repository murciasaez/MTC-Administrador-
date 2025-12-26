import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-row">
            {/* Left Column: Branding */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between overflow-hidden bg-background-dark">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByJZTiqIhTMT_x1NFyb0UmaHBz8FDNjNe1m_JW1Z410gv-LNKrh7JRUNZxOIxMb89RK2Fc4qM6soNQBkKYeD7ZEbb_8jKbpsX7E4tLkEGVu-WnPt_532OjlpDOOcp--xPwO5BkYFZn7hph2hF_Kn8lLvRkiMJ-hAV2Mj2M8RXdbIQEZBUCV0X1y1-o3o_6AGYk9CJKNjbanbCUM0EinrPoWF-NaXyQ2CM0FxBmLghtqdJEQEKj1yhnU1_yzEjAwloeRg3mHKxYW4U")'}}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-background-dark/30 mix-blend-multiply"></div>
                <div className="relative z-10 flex flex-col h-full justify-between p-16 text-white">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary">
                            <span className="material-symbols-outlined" style={{fontSize: '24px'}}>spa</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">MTC Administrativo</span>
                    </div>
                    <div className="max-w-xl space-y-6">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight">Equilibrio y gestión en un solo lugar.</h1>
                        <p className="text-lg text-gray-200 font-medium leading-relaxed opacity-90">
                            Plataforma segura para el personal médico y administrativo. Gestione citas, expedientes y recursos con la eficiencia que su práctica merece.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                        <span className="material-symbols-outlined text-primary" style={{fontSize: '18px'}}>shield</span>
                        <span>Acceso Seguro Encriptado</span>
                    </div>
                </div>
            </div>
            {/* Right Column: Login Form */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-white dark:bg-background-dark px-6 py-12 transition-colors duration-300">
                <div className="w-full max-w-[480px] flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="lg:hidden mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                            <span className="material-symbols-outlined" style={{fontSize: '28px'}}>spa</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <p className="text-text-main-light dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] text-center">
                                Bienvenido de nuevo
                            </p>
                            <p className="text-text-secondary-light dark:text-gray-400 text-base font-normal leading-normal text-center">
                                Ingrese sus credenciales para acceder al panel
                            </p>
                        </div>
                    </div>
                    <form className="flex flex-col gap-5 mt-2" onSubmit={handleLogin}>
                        <div className="flex flex-col w-full gap-2">
                            <label className="text-text-main-light dark:text-gray-200 text-base font-medium leading-normal">
                                Nombre de usuario
                            </label>
                            <div className="relative flex items-center">
                                <input className="flex w-full resize-none overflow-hidden rounded-lg text-text-main-light dark:text-white border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-14 placeholder:text-text-secondary-light dark:placeholder:text-gray-500 p-[15px] pl-11 text-base font-normal leading-normal transition-all" placeholder="ej. admin@clinica.com" required type="email"/>
                                <div className="absolute left-3.5 text-text-secondary-light dark:text-gray-500 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex justify-between items-end">
                                <label className="text-text-main-light dark:text-gray-200 text-base font-medium leading-normal">
                                    Contraseña
                                </label>
                            </div>
                            <div className="relative flex w-full items-stretch rounded-lg">
                                <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border border-r-0 border-border-light dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-14 placeholder:text-text-secondary-light dark:placeholder:text-gray-500 p-[15px] pl-11 text-text-main-light dark:text-white text-base font-normal leading-normal z-10 transition-all" placeholder="••••••••" type="password"/>
                                <div className="absolute left-3.5 top-0 h-full text-text-secondary-light dark:text-gray-500 flex items-center pointer-events-none z-20">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                                <div className="flex border border-l-0 border-border-light dark:border-border-dark bg-white dark:bg-surface-dark items-center justify-center pr-[15px] rounded-r-lg cursor-pointer group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <span className="material-symbols-outlined text-text-secondary-light dark:text-gray-400 group-hover:text-text-main-light dark:group-hover:text-white transition-colors">visibility</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-[#16cc44] focus:ring-4 focus:ring-primary/30 transition-all duration-200 text-[#111813] text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20">
                                <span className="truncate">Iniciar Sesión</span>
                            </button>
                        </div>
                        <div className="flex justify-center pt-1">
                            <a className="text-text-secondary-light dark:text-gray-400 text-sm font-medium leading-normal text-center hover:text-primary dark:hover:text-primary transition-colors underline decoration-transparent hover:decoration-current" href="#">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                    <div className="flex items-center justify-center gap-2 mt-auto pt-8">
                        <p className="text-xs text-text-secondary-light/60 dark:text-gray-600 text-center">
                            © 2024 Clínica MTC. Sistema de Gestión Interna v2.1
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};