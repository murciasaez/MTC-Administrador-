import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 h-full">
            {/* Controls Header: Title, Navigation, Filters */}
            <div className="flex flex-col gap-6 mb-4">
                {/* Title & Week Navigation */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-main-light dark:text-white">Agenda Semanal</h1>
                        <p className="text-[#63886c] dark:text-[#a0bca5] text-sm mt-1">Gestión de citas y disponibilidad de consultorios.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-surface-light dark:bg-surface-dark p-1.5 rounded-xl border border-[#dce5de] dark:border-[#2c3e2e] shadow-sm">
                        <button className="p-2 hover:bg-[#f0f4f1] dark:hover:bg-[#253629] rounded-lg transition-colors text-current text-text-main-light dark:text-white">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </button>
                        <div className="h-6 w-px bg-[#dce5de] dark:bg-[#2c3e2e]"></div>
                        <button className="p-2 hover:bg-[#f0f4f1] dark:hover:bg-[#253629] rounded-lg transition-colors text-current text-text-main-light dark:text-white">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="text-sm font-semibold px-2 min-w-[140px] text-center select-none text-text-main-light dark:text-white">12 - 18 Ago, 2024</span>
                        <button className="p-2 hover:bg-[#f0f4f1] dark:hover:bg-[#253629] rounded-lg transition-colors text-current text-text-main-light dark:text-white">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                        <div className="h-6 w-px bg-[#dce5de] dark:bg-[#2c3e2e]"></div>
                        <button className="px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary-dark dark:text-white rounded-lg text-sm font-bold transition-colors">
                            Hoy
                        </button>
                    </div>
                </div>
                {/* Filters / Chips */}
                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-black text-sm font-bold shadow-sm transition-transform hover:scale-105">
                        <span>Todos</span>
                        <span className="bg-black/20 text-xs px-1.5 py-0.5 rounded-full">24</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-light dark:bg-surface-dark border border-[#dce5de] dark:border-[#2c3e2e] hover:border-primary transition-colors text-sm font-medium text-text-main-light dark:text-white">
                        <span className="size-2 rounded-full bg-blue-400"></span>
                        <span>Programada</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-light dark:bg-surface-dark border border-[#dce5de] dark:border-[#2c3e2e] hover:border-primary transition-colors text-sm font-medium text-text-main-light dark:text-white">
                        <span className="size-2 rounded-full bg-primary"></span>
                        <span>Atendida</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-light dark:bg-surface-dark border border-[#dce5de] dark:border-[#2c3e2e] hover:border-primary transition-colors text-sm font-medium text-text-main-light dark:text-white">
                        <span className="size-2 rounded-full bg-red-400"></span>
                        <span>Cancelada</span>
                    </button>
                </div>
            </div>
            {/* Calendar Grid Container */}
            <div className="flex-1 relative bg-surface-light dark:bg-surface-dark rounded-xl border border-[#dce5de] dark:border-[#2c3e2e] shadow-sm overflow-hidden flex flex-col min-h-0 container">
                {/* Table Header (Sticky) */}
                <div className="grid grid-cols-[80px_1fr] border-b border-[#dce5de] dark:border-[#2c3e2e] bg-[#fcfdfc] dark:bg-[#1f3325] z-10 sticky top-0">
                    {/* Time Column Header */}
                    <div className="p-4 border-r border-[#dce5de] dark:border-[#2c3e2e] flex items-center justify-center">
                        <span className="text-xs font-bold uppercase text-[#63886c] dark:text-[#8aa691]">Hora</span>
                    </div>
                    {/* Days Header */}
                    <div className="grid grid-cols-7 divide-x divide-[#dce5de] dark:divide-[#2c3e2e]">
                        <div className="p-3 text-center text-text-main-light dark:text-white">
                            <span className="block text-xs uppercase text-[#63886c] dark:text-[#8aa691] font-semibold">Lun</span>
                            <span className="block text-lg font-bold">12</span>
                        </div>
                        <div className="p-3 text-center bg-primary/10 dark:bg-primary/5">
                            <span className="block text-xs uppercase text-primary font-bold">Mar</span>
                            <span className="block text-lg font-bold text-primary">13</span>
                        </div>
                        <div className="p-3 text-center text-text-main-light dark:text-white">
                            <span className="block text-xs uppercase text-[#63886c] dark:text-[#8aa691] font-semibold">Mié</span>
                            <span className="block text-lg font-bold">14</span>
                        </div>
                        <div className="p-3 text-center text-text-main-light dark:text-white">
                            <span className="block text-xs uppercase text-[#63886c] dark:text-[#8aa691] font-semibold">Jue</span>
                            <span className="block text-lg font-bold">15</span>
                        </div>
                        <div className="p-3 text-center text-text-main-light dark:text-white">
                            <span className="block text-xs uppercase text-[#63886c] dark:text-[#8aa691] font-semibold">Vie</span>
                            <span className="block text-lg font-bold">16</span>
                        </div>
                        <div className="p-3 text-center bg-gray-50 dark:bg-[#16261b]">
                            <span className="block text-xs uppercase text-[#63886c] dark:text-[#8aa691] font-semibold">Sáb</span>
                            <span className="block text-lg font-bold text-[#63886c] dark:text-[#8aa691]">17</span>
                        </div>
                        <div className="p-3 text-center bg-gray-50 dark:bg-[#16261b]">
                            <span className="block text-xs uppercase text-[#63886c] dark:text-[#8aa691] font-semibold">Dom</span>
                            <span className="block text-lg font-bold text-[#63886c] dark:text-[#8aa691]">18</span>
                        </div>
                    </div>
                </div>
                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {/* Current Time Indicator Line */}
                    <div className="absolute top-[180px] left-0 w-full z-10 pointer-events-none flex items-center">
                        <div className="w-[80px] text-right pr-2 text-xs font-bold text-primary bg-surface-light dark:bg-surface-dark">10:45</div>
                        <div className="flex-1 h-[2px] bg-primary relative">
                            <div className="absolute -left-[4px] -top-[3px] size-2 rounded-full bg-primary"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[80px_1fr]">
                        {/* Time Labels Column */}
                        <div className="flex flex-col divide-y divide-[#dce5de] dark:divide-[#2c3e2e] border-r border-[#dce5de] dark:border-[#2c3e2e] bg-[#fcfdfc] dark:bg-[#1f3325]">
                            {[8,9,10,11,12,13,14,15].map(hour => (
                                <div key={hour} className="h-28 flex items-start justify-center pt-2"><span className="text-xs font-medium text-[#63886c]">{hour < 10 ? `0${hour}` : hour}:00</span></div>
                            ))}
                        </div>
                        {/* Days Columns Grid */}
                        <div className="grid grid-cols-7 divide-x divide-[#dce5de] dark:divide-[#2c3e2e] relative" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100%25' height='56' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 56L100 56' stroke='%23e55a5c' opacity='0.2' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`}}>
                            
                            {/* Monday */}
                            <div className="relative h-full border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                <Link to="/new-appointment" className="h-28 border-b border-dashed border-[#dce5de]/50 group relative hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer block">
                                    <div className="hidden group-hover:flex absolute inset-0 items-center justify-center text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined">add</span>
                                    </div>
                                </Link>
                                <div className="absolute top-[120px] left-1 right-1 h-24 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-md p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow z-10 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-blue-900 dark:text-blue-100 truncate">Maria G.</p>
                                        <p className="text-[10px] text-blue-700 dark:text-blue-300 truncate">Consulta General</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined !text-[12px]">schedule</span> 09:00 - 10:00
                                    </div>
                                </div>
                                    <div className="absolute top-[580px] left-1 right-1 h-24 bg-green-50 dark:bg-green-900/20 border-l-4 border-primary rounded-r-md p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow z-10 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-green-900 dark:text-green-100 truncate">Roberto F.</p>
                                        <p className="text-[10px] text-green-700 dark:text-green-300 truncate">Masaje Tui Na</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined !text-[12px] icon-filled">check_circle</span> Atendida
                                    </div>
                                </div>
                            </div>

                            {/* Tuesday */}
                            <div className="relative h-full bg-primary/5 border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                    <div className="absolute top-[20px] left-1 right-1 h-20 bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-400 rounded-r-md p-2 opacity-70 cursor-pointer hover:opacity-100 transition-opacity z-10">
                                    <p className="text-xs font-bold text-gray-500 line-through truncate">Juan P.</p>
                                    <p className="text-[10px] text-gray-500 truncate">Acupuntura</p>
                                    <div className="mt-2 flex items-center gap-1 text-[10px] text-red-500 font-medium">
                                        <span className="material-symbols-outlined !text-[12px]">cancel</span> Cancelada
                                    </div>
                                </div>
                                <div className="absolute top-[340px] left-1 right-1 h-32 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 rounded-r-md p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow z-10 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-purple-900 dark:text-purple-100 truncate">Elena D.</p>
                                        <p className="text-[10px] text-purple-700 dark:text-purple-300 truncate">Fitoterapia + Acup.</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined !text-[12px]">schedule</span> 11:00 - 12:30
                                    </div>
                                </div>
                            </div>

                            {/* Wednesday */}
                            <div className="relative h-full border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                <div className="absolute top-[130px] left-1 right-1 h-20 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-md p-2 shadow-sm cursor-pointer z-10">
                                    <p className="text-xs font-bold text-blue-900 dark:text-blue-100 truncate">Carlos T.</p>
                                    <p className="text-[10px] text-blue-700 dark:text-blue-300 truncate">Ventosas</p>
                                </div>
                            </div>

                            {/* Thursday */}
                            <div className="relative h-full border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                <div className="absolute top-[20px] left-1 right-1 h-24 bg-green-50 dark:bg-green-900/20 border-l-4 border-primary rounded-r-md p-2 shadow-sm cursor-pointer z-10">
                                    <p className="text-xs font-bold text-green-900 dark:text-green-100 truncate">Ana R.</p>
                                    <p className="text-[10px] text-green-700 dark:text-green-300 truncate">Masaje</p>
                                    <div className="mt-auto flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined !text-[12px] icon-filled">check_circle</span> Atendida
                                    </div>
                                </div>
                            </div>

                            {/* Friday */}
                            <div className="relative h-full border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                    <div className="absolute top-[340px] left-1 right-1 h-24 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-md p-2 shadow-sm cursor-pointer z-10">
                                    <p className="text-xs font-bold text-blue-900 dark:text-blue-100 truncate">Pedro S.</p>
                                    <p className="text-[10px] text-blue-700 dark:text-blue-300 truncate">Masaje</p>
                                </div>
                            </div>

                            {/* Saturday */}
                            <div className="relative h-full bg-gray-50 dark:bg-[#16261b] border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                    <div className="absolute inset-0 bg-gray-100/50 dark:bg-black/20 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xs font-bold text-gray-400 rotate-90 md:rotate-0 mt-4 md:mt-0">HORARIO REDUCIDO</span>
                                </div>
                                    <div className="absolute top-[20px] left-1 right-1 h-20 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-md p-2 shadow-sm cursor-pointer z-10 pointer-events-auto">
                                    <p className="text-xs font-bold text-blue-900 dark:text-blue-100 truncate">Sofia L.</p>
                                    <p className="text-[10px] text-blue-700 dark:text-blue-300 truncate">Emergencia</p>
                                </div>
                            </div>

                            {/* Sunday */}
                            <div className="relative h-full bg-gray-100 dark:bg-[#0f1a12] border-b border-[#dce5de] dark:border-[#2c3e2e]">
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined !text-4xl">block</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-text-main-light dark:text-white">Cerrado</span>
                                    </div>
                                </div>
                            </div>

                            {/* Global Lunch Break Line */}
                            <div className="absolute top-[448px] left-0 right-0 h-28 bg-[repeating-linear-gradient(45deg,#f8faf8,#f8faf8_10px,#f1f5f1_10px,#f1f5f1_20px)] dark:bg-[repeating-linear-gradient(45deg,#1a2c20,#1a2c20_10px,#23362a_10px,#23362a_20px)] flex items-center justify-center border-y border-[#dce5de] dark:border-[#2c3e2e] pointer-events-none">
                                <span className="text-xs font-medium text-[#63886c] uppercase tracking-wider bg-surface-light dark:bg-surface-dark px-2 py-1 rounded-full shadow-sm">Almuerzo</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};