import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- TIPOS ---
type Paciente = {
    id: number;
    nombre: string;
    telefono: string;
    ultimaVisita: string;
    estado: 'Activo' | 'Pendiente' | 'Inactivo';
    avatarColor: string;
    notas?: string; 
};

type Cita = {
    id: number;
    paciente: string;
    fecha: string;
    tipo: string;
    estado: string;
    horaInicio: number;
};

export const PatientsList: React.FC = () => {
    // --- ESTADOS ---
    const [listaPacientes, setListaPacientes] = useState<Paciente[]>(() => {
        const guardados = localStorage.getItem('pacientesLocal');
        return guardados ? JSON.parse(guardados) : [];
    });

    const [busqueda, setBusqueda] = useState("");
    const [menuAbiertoId, setMenuAbiertoId] = useState<number | null>(null);

    // --- ESTADOS PARA LA FICHA DEL PACIENTE ---
    const [pacienteFicha, setPacienteFicha] = useState<Paciente | null>(null);
    const [historialCitas, setHistorialCitas] = useState<Cita[]>([]);

    // --- FUNCIONES ---
    const abrirFicha = (paciente: Paciente) => {
        const todasLasCitas: Cita[] = JSON.parse(localStorage.getItem('citasLocal') || '[]');
        const historial = todasLasCitas.filter(c => c.paciente === paciente.nombre);
        historial.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        
        setHistorialCitas(historial);
        setPacienteFicha(paciente);
        setMenuAbiertoId(null);
    };

    const handleEliminar = (id: number, nombre: string) => {
        if (window.confirm(`¿Eliminar a ${nombre}?`)) {
            const nuevaLista = listaPacientes.filter(p => p.id !== id);
            setListaPacientes(nuevaLista);
            localStorage.setItem('pacientesLocal', JSON.stringify(nuevaLista));
            setMenuAbiertoId(null);
        }
    };

    const pacientesFiltrados = listaPacientes.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.telefono.includes(busqueda)
    );

    return (
        <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 h-full overflow-hidden" onClick={() => setMenuAbiertoId(null)}> 
            
            {/* CABECERA (Botón Alta Rápida Eliminado) */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Directorio de Pacientes</h1>
            </div>

            {/* BUSCADOR */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">search</span>
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o teléfono..." 
                        className="w-full bg-transparent outline-none dark:text-white"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {/* TABLA */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-[#1f3325]">
                        <tr>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500">Nombre</th>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500">Teléfono</th>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500">Notas de Sesión</th>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {pacientesFiltrados.map((paciente) => (
                            <tr key={paciente.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold dark:text-white flex items-center gap-3">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs text-white ${paciente.avatarColor || 'bg-primary'}`}>{paciente.nombre.charAt(0)}</div>
                                    {paciente.nombre}
                                </td>
                                <td className="p-4 text-sm text-gray-600 dark:text-gray-300 font-mono">{paciente.telefono}</td>
                                <td className="p-4 text-sm text-gray-600 dark:text-gray-300 max-w-[300px]">
                                    <div className="truncate italic">
                                        {paciente.notas ? paciente.notas : <span className="text-gray-400">Sin notas registradas</span>}
                                    </div>
                                </td>
                                <td className="p-4 text-right relative">
                                    <button onClick={(e) => { e.stopPropagation(); setMenuAbiertoId(menuAbiertoId === paciente.id ? null : paciente.id); }} className="text-gray-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                    
                                    {menuAbiertoId === paciente.id && (
                                        <div className="absolute right-8 top-8 w-40 bg-white dark:bg-[#1a2e20] rounded shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden text-left">
                                            <button onClick={() => abrirFicha(paciente)} className="w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/10 text-sm flex gap-2 items-center transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">visibility</span> Ver Ficha
                                            </button>
                                            <button onClick={() => handleEliminar(paciente.id, paciente.nombre)} className="w-full px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex gap-2 items-center transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">delete</span> Eliminar
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL FICHA DEL PACIENTE */}
            {pacienteFicha && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPacienteFicha(null)}>
                    <div className="bg-white dark:bg-[#1a2e20] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                        {/* Cabecera Ficha */}
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#1f3325] flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`size-14 rounded-full flex items-center justify-center text-2xl font-bold text-white ${pacienteFicha.avatarColor || 'bg-primary'}`}>{pacienteFicha.nombre.charAt(0)}</div>
                                <div>
                                    <h2 className="text-xl font-bold dark:text-white">{pacienteFicha.nombre}</h2>
                                    <p className="text-sm text-gray-500 font-mono">{pacienteFicha.telefono}</p>
                                </div>
                            </div>
                            <button onClick={() => setPacienteFicha(null)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Cuerpo de la Ficha */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            {/* Sección Notas */}
                            <div>
                                <h3 className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Notas del Paciente</h3>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-xl text-gray-700 dark:text-gray-300 italic">
                                    {pacienteFicha.notas || "No hay notas clínicas para este paciente."}
                                </div>
                            </div>

                            {/* Historial de Citas */}
                            <div>
                                <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Historial de Citas</h3>
                                {historialCitas.length > 0 ? (
                                    <div className="space-y-3">
                                        {historialCitas.map((cita) => (
                                            <div key={cita.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 text-primary-dark p-2 rounded-lg">
                                                        <span className="material-symbols-outlined">event</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm dark:text-white">{new Date(cita.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                        <p className="text-xs text-gray-500">{cita.tipo}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${cita.estado === 'programada' ? 'bg-blue-50 text-blue-700 border-blue-100' : cita.estado === 'atendida' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'} border`}>
                                                    {cita.estado}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                                        <span className="material-symbols-outlined text-4xl mb-2 opacity-30">event_busy</span>
                                        <p>No hay citas registradas.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#1f3325] text-right">
                             <Link to="/new-appointment" className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark px-4 py-2 rounded-lg text-primary font-bold text-sm hover:shadow-md transition-all inline-block" onClick={() => setPacienteFicha(null)}>
                                + Agendar nueva cita
                             </Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};