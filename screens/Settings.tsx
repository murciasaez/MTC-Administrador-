import React from 'react';

export const Settings: React.FC = () => {
    return (
        <div className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8 h-full overflow-y-auto">
            <div className="flex flex-col max-w-[1280px] w-full gap-6">
                {/* Page Heading & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#dce5de] dark:border-white/10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#111813] dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Configuración de Horarios</h1>
                        <p className="text-[#63886c] dark:text-gray-400 text-base font-normal">Gestione la disponibilidad semanal y las excepciones puntuales.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#111813] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                            Cancelar
                        </button>
                        <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-primary-dark text-[#112115] text-sm font-bold shadow-lg shadow-primary/20 transition-all transform active:scale-95">
                            <span className="material-symbols-outlined mr-2 text-[18px]">save</span>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                    {/* Left Column: Weekly Schedule Builder */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e5e7eb] dark:border-white/5 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#111813] dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">calendar_view_week</span>
                                    Horario Base Semanal
                                </h2>
                            </div>
                            {/* Days List (Simplified mapping) */}
                            <div className="flex flex-col gap-4">
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
                                    <div key={day} className="day-row group rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] hover:border-primary/30 hover:shadow-sm transition-all p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 min-w-[140px]">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer toggle-checkbox" defaultChecked />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary toggle-label"></div>
                                                </label>
                                                <span className="font-bold text-[#111813] dark:text-white text-lg">{day}</span>
                                            </div>
                                            <div className="flex flex-1 flex-col sm:flex-row gap-3 items-center justify-end">
                                                <div className="flex items-center gap-2 bg-white dark:bg-black/20 px-3 py-1.5 rounded border border-gray-200 dark:border-white/10">
                                                    <span className="material-symbols-outlined text-gray-400 text-[18px]">wb_sunny</span>
                                                    <input type="time" defaultValue="09:00" className="border-none p-0 h-6 w-20 text-sm bg-transparent focus:ring-0 text-[#111813] dark:text-white font-medium text-center" />
                                                    <span className="text-gray-400">-</span>
                                                    <input type="time" defaultValue="14:00" className="border-none p-0 h-6 w-20 text-sm bg-transparent focus:ring-0 text-[#111813] dark:text-white font-medium text-center" />
                                                </div>
                                                <div className="flex items-center gap-2 bg-white dark:bg-black/20 px-3 py-1.5 rounded border border-gray-200 dark:border-white/10">
                                                    <span className="material-symbols-outlined text-gray-400 text-[18px]">bedtime</span>
                                                    <input type="time" defaultValue="16:00" className="border-none p-0 h-6 w-20 text-sm bg-transparent focus:ring-0 text-[#111813] dark:text-white font-medium text-center" />
                                                    <span className="text-gray-400">-</span>
                                                    <input type="time" defaultValue="20:00" className="border-none p-0 h-6 w-20 text-sm bg-transparent focus:ring-0 text-[#111813] dark:text-white font-medium text-center" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Closed Day Example */}
                                <div className="day-row group rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] opacity-60 hover:opacity-100 transition-all p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 min-w-[140px]">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer toggle-checkbox" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary toggle-label"></div>
                                            </label>
                                            <span className="font-bold text-gray-400 dark:text-gray-500 text-lg">Sábado</span>
                                        </div>
                                        <div className="flex flex-1 justify-end">
                                            <span className="text-sm font-medium text-gray-400 italic">Cerrado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Calendar & Exceptions */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e5e7eb] dark:border-white/5 p-6 h-fit">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">event_busy</span>
                                    Excepciones y Bloqueos
                                </h2>
                            </div>
                            {/* Simplified Calendar Grid */}
                            <div className="mb-6">
                                <div className="grid grid-cols-7 gap-1">
                                    {[...Array(30).keys()].map(i => {
                                        const day = i+1;
                                        let classes = "aspect-square flex items-center justify-center text-sm rounded hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer text-gray-700 dark:text-gray-300";
                                        if (day === 12) return <div key={i} className="aspect-square flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded cursor-pointer ring-1 ring-red-100 dark:ring-red-900/30" title="Festivo Nacional">12</div>
                                        if (day === 16) return <div key={i} className="aspect-square flex items-center justify-center text-white text-sm bg-primary rounded shadow-sm cursor-pointer">16</div>
                                        return <div key={i} className={classes}>{day}</div>
                                    })}
                                </div>
                            </div>
                                {/* Upcoming Blocks List */}
                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider text-[11px]">Próximos Bloqueos</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                                        <div className="mt-0.5 text-red-500 bg-white dark:bg-red-900/30 rounded p-1">
                                            <span className="material-symbols-outlined text-[16px] block">celebration</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-red-900 dark:text-red-100">Día de la Hispanidad</p>
                                            <p className="text-xs text-red-600 dark:text-red-300">12 Oct - Todo el día</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};