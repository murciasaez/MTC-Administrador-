import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NewAppointment: React.FC = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState('60');

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col px-6 py-8 md:px-10 h-full">
            {/* Breadcrumbs */}
            <div className="mb-6 flex flex-wrap gap-2 text-sm">
                <Link to="/dashboard" className="text-text-secondary-light font-medium transition-colors hover:text-primary dark:text-gray-400">Agenda</Link>
                <span className="text-text-secondary-light dark:text-gray-500">/</span>
                <span className="text-text-main-light font-bold dark:text-white">Nueva Cita</span>
            </div>
            {/* Page Heading */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-text-main-light text-3xl font-bold tracking-tight dark:text-white">Nueva Cita</h2>
                    <p className="text-text-secondary-light text-base dark:text-gray-400">Complete los detalles para programar una sesión.</p>
                </div>
            </div>
            {/* Form Container */}
            <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-[#1a2c20] dark:ring-white/5 lg:p-8 overflow-y-auto">
                {/* Section 1: Patient Selection */}
                <div className="flex flex-col gap-2">
                    <label className="text-text-main-light text-base font-bold dark:text-white">Paciente</label>
                    <div className="relative flex w-full max-w-lg items-center">
                        <input className="w-full rounded-lg border border-[#dce5de] bg-white py-3 pl-4 pr-12 text-base text-text-main-light placeholder:text-text-secondary-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-[#233829] dark:text-white dark:placeholder:text-gray-500" placeholder="Buscar por nombre o historia clínica..." type="text" defaultValue="María González"/>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-gray-400">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                        <Link to="/quick-add" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined text-lg">add</span> Registrar nuevo paciente
                        </Link>
                    </div>
                </div>
                <hr className="border-[#f0f4f1] dark:border-white/10 my-2"/>
                {/* Section 2: Date & Time */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left: Calendar Picker */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <label className="text-text-main-light text-base font-bold dark:text-white">Fecha</label>
                        <div className="rounded-lg border border-[#dce5de] p-4 dark:border-white/10 bg-background-light dark:bg-[#152319]">
                            <div className="mb-4 flex items-center justify-between">
                                <button className="rounded-full p-1 hover:bg-white dark:hover:bg-[#233829] transition-colors text-text-main-light dark:text-white">
                                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                                </button>
                                <span className="text-text-main-light font-bold dark:text-white">Octubre 2023</span>
                                <button className="rounded-full p-1 hover:bg-white dark:hover:bg-[#233829] transition-colors text-text-main-light dark:text-white">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-7 text-center text-xs font-medium text-text-secondary-light dark:text-gray-400 mb-2">
                                <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-sm">
                                {/* Empty days */}
                                <span></span><span></span><span></span><span></span>
                                {/* Days */}
                                {[1,2,3,4].map(d => <button key={d} className="h-9 w-9 rounded-full text-text-main-light hover:bg-white dark:text-white dark:hover:bg-[#233829]">{d}</button>)}
                                <button className="h-9 w-9 rounded-full bg-primary text-text-main-light font-bold shadow-sm">5</button>
                                {[6,7,8,9,10,11,12,13,14,15].map(d => <button key={d} className="h-9 w-9 rounded-full text-text-main-light hover:bg-white dark:text-white dark:hover:bg-[#233829]">{d}</button>)}
                            </div>
                        </div>
                    </div>
                    {/* Right: Time & Duration */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Time Slots */}
                        <div className="flex flex-col gap-2">
                            <label className="text-text-main-light text-base font-bold dark:text-white">Hora de inicio</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                <button className="rounded-lg border border-[#dce5de] bg-white py-2 text-sm font-medium text-text-secondary-light hover:border-primary hover:text-primary dark:border-white/10 dark:bg-[#233829] dark:text-gray-300 dark:hover:border-primary">09:00</button>
                                <button className="rounded-lg border border-[#dce5de] bg-white py-2 text-sm font-medium text-text-secondary-light hover:border-primary hover:text-primary dark:border-white/10 dark:bg-[#233829] dark:text-gray-300 dark:hover:border-primary">09:30</button>
                                <button className="rounded-lg border border-primary bg-primary/10 py-2 text-sm font-bold text-text-main-light ring-1 ring-primary dark:bg-primary/20 dark:text-white">10:00</button>
                                <button className="rounded-lg border border-[#dce5de] bg-white py-2 text-sm font-medium text-text-secondary-light hover:border-primary hover:text-primary dark:border-white/10 dark:bg-[#233829] dark:text-gray-300 dark:hover:border-primary">10:30</button>
                                <button className="rounded-lg border border-[#dce5de] bg-gray-50 py-2 text-sm font-medium text-gray-300 cursor-not-allowed decoration-slice line-through dark:border-white/5 dark:bg-[#152319] dark:text-gray-600">11:00</button>
                                <button className="rounded-lg border border-[#dce5de] bg-white py-2 text-sm font-medium text-text-secondary-light hover:border-primary hover:text-primary dark:border-white/10 dark:bg-[#233829] dark:text-gray-300 dark:hover:border-primary">11:30</button>
                            </div>
                        </div>
                        {/* Duration Selection */}
                        <div className="flex flex-col gap-2">
                            <label className="text-text-main-light text-base font-bold dark:text-white">Duración</label>
                            <div className="flex flex-wrap gap-3">
                                {['30', '45', '60', '90'].map(val => (
                                    <label key={val} className="cursor-pointer">
                                        <input className="peer sr-only" name="duration" type="radio" value={val} checked={duration === val} onChange={() => setDuration(val)}/>
                                        <div className="rounded-full border border-[#dce5de] bg-white px-5 py-2 text-sm font-medium text-text-main-light transition-all hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-text-main-light dark:border-white/10 dark:bg-[#233829] dark:text-white dark:peer-checked:bg-primary dark:peer-checked:text-black">
                                            {val} min
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Summary Pill */}
                        <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#f0f4f1] px-4 py-3 text-sm text-text-main-light dark:bg-[#233829] dark:text-gray-200">
                            <span className="material-symbols-outlined text-lg">schedule</span>
                            <span>Cita de <span className="font-bold">10:00</span> a <span className="font-bold">11:00</span></span>
                        </div>
                    </div>
                </div>
                <hr className="border-[#f0f4f1] dark:border-white/10 my-2"/>
                {/* Section 3: Details */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label className="text-text-main-light text-base font-bold dark:text-white">Tipo de Tratamiento</label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg border border-[#dce5de] bg-white py-3 pl-4 pr-10 text-base text-text-main-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-[#233829] dark:text-white">
                                <option>Acupuntura General</option>
                                <option>Masaje Tui Na</option>
                                <option>Fitoterapia China</option>
                                <option>Consulta Inicial</option>
                            </select>
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-gray-400">
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-text-main-light text-base font-bold dark:text-white">Estado</label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg border border-[#dce5de] bg-white py-3 pl-4 pr-10 text-base text-text-main-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-[#233829] dark:text-white">
                                <option>Confirmada</option>
                                <option>Pendiente</option>
                                <option>Cancelada</option>
                                <option>Completada</option>
                            </select>
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-gray-400">
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 4: Notes */}
                <div className="flex flex-col gap-2">
                    <label className="text-text-main-light text-base font-bold dark:text-white">Notas Internas</label>
                    <textarea className="w-full rounded-lg border border-[#dce5de] bg-white p-4 text-base text-text-main-light placeholder:text-text-secondary-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-[#233829] dark:text-white dark:placeholder:text-gray-500" placeholder="Añadir notas sobre la cita o el paciente..." rows={3}></textarea>
                </div>
                {/* Section 5: Actions */}
                <div className="mt-4 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <button onClick={() => navigate('/dashboard')} className="rounded-lg px-6 py-3 text-base font-bold text-text-secondary-light hover:bg-gray-100 hover:text-text-main-light dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors">
                        Cancelar
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-[#111813] shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
                        <span className="material-symbols-outlined text-xl">check</span>
                        Guardar Cita
                    </button>
                </div>
            </div>
        </div>
    );
};