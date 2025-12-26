import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const QuickPatientAdd: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 px-4 md:px-12 py-8 max-w-5xl mx-auto w-full flex flex-col h-full">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
                <Link to="/dashboard" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors font-medium">Agenda</Link>
                <span className="text-text-secondary-light/40 dark:text-text-secondary-dark/40 font-medium">/</span>
                <Link to="/new-appointment" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors font-medium">Nueva Cita</Link>
                <span className="text-text-secondary-light/40 dark:text-text-secondary-dark/40 font-medium">/</span>
                <span className="text-text-main-light dark:text-white font-semibold bg-primary/10 px-2 py-0.5 rounded text-xs text-green-800 dark:text-green-300">Alta Rápida</span>
            </div>
            {/* Main Form Card */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden relative">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none z-0">
                        <img alt="Bamboo texture" className="w-full h-full object-cover -rotate-12 translate-x-12 -translate-y-12 mask-image-gradient" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRgRZrdXwkYXs_RqdQOmeVD5qoLtCysGSXdPcWwChObJkwBrDGWoxCqb1mvqpSxzo6FDC3zh-QWQ5MOp5qPDIx9-3-ytfMD0JiBOsaKGj2l04C6xY1MGlpeIvugpgXuB2BrkeHeqg3RbwhhzowYm6K2Quzxw2YZoYukbUXgOMTNKgsRywOTuThBx7zTBjL79Nqm8BEvTf0o_3cYjutNd_wlyegDsl8C2EnRaoz8i_QpP4DPlIYSyZJoeE_xTqYcysigZM-1oaTgAE"/>
                    </div>
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 pt-8 pb-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-main-light dark:text-white tracking-tight">Nuevo Paciente</h2>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-base">Ingrese los datos esenciales para agilizar la cita.</p>
                            </div>
                            <button onClick={() => navigate(-1)} aria-label="Cerrar" className="flex items-center justify-center w-8 h-8 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="w-full h-px bg-border-light dark:bg-border-dark/50"></div>
                        {/* Form Content */}
                        <div className="px-8 py-8 flex flex-col gap-6">
                            {/* Input: Nombre */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark flex items-center gap-1" htmlFor="name">
                                    Nombre y Apellidos <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">person</span>
                                    </div>
                                    <input autoFocus className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-background-light dark:bg-background-dark/50 border border-border-light dark:border-border-dark text-text-main-light dark:text-white placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-lg" id="name" placeholder="Ej. María García López" type="text"/>
                                </div>
                            </div>
                            {/* Input: Teléfono */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark flex items-center gap-1" htmlFor="phone">
                                    Teléfono Móvil <span className="text-red-500">*</span>
                                </label>
                                <div className="relative flex gap-3">
                                    <div className="relative w-28 shrink-0">
                                        <select className="w-full h-full pl-3 pr-8 py-3.5 rounded-xl bg-background-light dark:bg-background-dark/50 border border-border-light dark:border-border-dark text-text-main-light dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer">
                                            <option>🇪🇸 +34</option>
                                            <option>🇫🇷 +33</option>
                                            <option>🇬🇧 +44</option>
                                            <option>🇵🇹 +351</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-text-secondary-light text-sm">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="relative flex-1 group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">smartphone</span>
                                        </div>
                                        <input className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-background-light dark:bg-background-dark/50 border border-border-light dark:border-border-dark text-text-main-light dark:text-white placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono text-lg tracking-wide" id="phone" placeholder="600 123 456" type="tel"/>
                                    </div>
                                </div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark pl-1">Se enviará un SMS de confirmación automáticamente.</p>
                            </div>
                            {/* Alert / Info Box */}
                            <div className="mt-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm mt-0.5">info</span>
                                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                    Al guardar, se creará la ficha del paciente y podrá asignarle la cita inmediatamente.
                                </p>
                            </div>
                        </div>
                        {/* Footer Actions */}
                        <div className="px-8 pb-8 pt-2 flex flex-col sm:flex-row gap-4 items-center justify-end">
                            <button onClick={() => navigate('/patients')} className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-transparent hover:bg-background-light dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark font-bold transition-colors">
                                Cancelar
                            </button>
                            <button onClick={() => navigate('/patients')} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-[#15cf44] active:bg-[#12b83c] text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">check</span>
                                <span>Guardar y Asignar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};