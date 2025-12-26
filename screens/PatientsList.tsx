import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PatientsList: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex justify-center py-8 px-4 sm:px-8 h-full">
            <div className="layout-content-container flex flex-col w-full max-w-[1400px]">
                {/* Page Heading */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-[#111813] dark:text-white">
                            Directorio de Pacientes
                        </h1>
                        <p className="text-[#63886c] dark:text-gray-400 text-base font-normal">
                            Gestión y consulta de historiales clínicos
                        </p>
                    </div>
                    <button onClick={() => navigate('/quick-add')} className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-[#16cc44] text-black text-sm font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                        <span className="material-symbols-outlined !text-[20px]">add</span>
                        <span>Alta Rápida</span>
                    </button>
                </div>
                {/* Filters */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-[#dce5de] dark:border-gray-700 p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#63886c] dark:text-gray-500">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input className="w-full h-12 pl-12 pr-4 rounded-lg bg-white dark:bg-[#112115] border border-[#dce5de] dark:border-gray-700 text-[#111813] dark:text-white placeholder-[#63886c] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Buscar por nombre, teléfono o DNI..." type="text"/>
                        </div>
                    </div>
                </div>
                {/* Table Section */}
                <div className="flex-1 overflow-hidden rounded-xl border border-[#dce5de] dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-sm flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-[#dce5de] dark:border-gray-700">
                                    <th className="px-6 py-4 text-sm font-bold text-[#111813] dark:text-white">Nombre del Paciente</th>
                                    <th className="px-6 py-4 text-sm font-bold text-[#111813] dark:text-white">Teléfono</th>
                                    <th className="px-6 py-4 text-sm font-bold text-[#111813] dark:text-white">Última Visita</th>
                                    <th className="px-6 py-4 text-sm font-bold text-[#111813] dark:text-white w-32">Estado</th>
                                    <th className="px-6 py-4 text-sm font-bold text-[#111813] dark:text-white w-24 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dce5de] dark:divide-gray-700">
                                {[
                                    {name: "Ana García", phone: "+34 600 123 456", visit: "12 Oct 2023", status: "Activo", color: "green", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJiuaZgQ2giReHuyFskHpiecgIzat9dD4SmxACiCg8ewzN4EUPmGzLQW6scGZ0FXxHZX9SmjFdx_gXzT_t049IX4VOjcdI3YaKKcNrkBgjRIzdgq8Euj4OABnVas8aay-nuQBI0L3gTGqozFXHE49OT_KCUFo1DhRdFpDaIrnWrlvMDhl9Z9bgEyOcYe9OsilaO3SfLgznctIuIB_0_lMpFyKeHIGQ1XnK_EC0ZpaQMHGx7fBaImI9RLYH-afecW9DeI9KWGAuR58"},
                                    {name: "Carlos Ruiz", phone: "+34 611 987 654", visit: "05 Sep 2023", status: "Pendiente", color: "yellow", initial: "CR"},
                                    {name: "María López", phone: "+34 622 333 444", visit: "20 Oct 2023", status: "Activo", color: "green", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcM8fe2SwKu5aAO5UZ1Xnd8WhpKdEigpWgBeAbUh5eusZxAKOBF3DuWCs_zXt7jzAzVs4jFU1-azVzUElQz95A3GNx7UPS1tIeYqgEbBgpf84Dr21x9tfkm20HmBTDBUU5XM1otjyzKFX1F9zGPiuLBt4aXNpiNuFID9tEzPE38seMN3W_tkEGGX54bKmNwcwNX3OV8oAhfwDxyabSuGOP8q7PoXWIWpdCFX9BVmqisK8X0WOe2rJWIsa-DFxmnBkCsQsLe5oQReo"},
                                    {name: "Javier Torres", phone: "+34 633 555 666", visit: "15 Ago 2023", status: "Inactivo", color: "gray", initial: "JT"},
                                ].map((patient, idx) => (
                                    <tr key={idx} className="group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {patient.img ? 
                                                    <div className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700" style={{backgroundImage: `url("${patient.img}")`}}></div> :
                                                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">{patient.initial}</div>
                                                }
                                                <div className="font-semibold text-[#111813] dark:text-white">{patient.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono">{patient.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{patient.visit}</td>
                                        <td className="px-6 py-4">
                                                <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${patient.color}-100 text-${patient.color}-800 dark:bg-${patient.color}-900/30 dark:text-${patient.color}-300`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-md text-gray-500 hover:text-primary hover:bg-primary/10 dark:text-gray-400 dark:hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};