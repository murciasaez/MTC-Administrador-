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
};

// Tipo Cita (para leer historial)
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

    // --- ESTADOS PARA LA FICHA DEL PACIENTE (PASO B) ---
    const [pacienteFicha, setPacienteFicha] = useState<Paciente | null>(null);
    const [historialCitas, setHistorialCitas] = useState<Cita[]>([]);

    // --- FUNCIONES ---
    const abrirFicha = (paciente: Paciente) => {
        // 1. Cargamos todas las citas
        const todasLasCitas: Cita[] = JSON.parse(localStorage.getItem('citasLocal') || '[]');
        // 2. Filtramos las de ESTE paciente (por nombre exacto)
        const historial = todasLasCitas.filter(c => c.paciente === paciente.nombre);
        // 3. Ordenamos por fecha (más reciente primero)
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

    // Filtros visuales
    const pacientesFiltrados = listaPacientes.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.telefono.includes(busqueda)
    );

    return (
        <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 h-full overflow-hidden" onClick={() => setMenuAbiertoId(null)}> 
            
            {/* CABECERA */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Directorio</h1>
                <Link to="/quick-add" className="bg-primary hover:bg-primary-dark text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span> Alta Rápida
                </Link>
            </div>

            {/* BUSCADOR */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 shadow-sm">
                <input 
                    type="text" 
                    placeholder="Buscar paciente..." 
                    className="w-full bg-transparent outline-none dark:text-white"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {/* TABLA */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-[#1f3325]">
                        <tr>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500">Nombre</th>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500">Teléfono</th>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500">Estado</th>
                            <th className="p-4 text-xs font-bold uppercase text-gray-500 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {pacientesFiltrados.map((paciente) => (
                            <tr key={paciente.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                                <td className="p-4 font-bold dark:text-white flex items-center gap-3">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs ${paciente.avatarColor}`}>{paciente.nombre.charAt(0)}</div>
                                    {paciente.nombre}
                                </td>
                                <td className="p-4 text-sm text-gray-600 dark:text-gray-300 font-mono">{paciente.telefono}</td>
                                <td className="p-4"><span className="px-2 py-1 rounded-full bg-gray-100 text-xs font-bold border">{paciente.estado}</span></td>
                                <td className="p-4 text-right relative">
                                    <button onClick={(e) => { e.stopPropagation(); setMenuAbiertoId(menuAbiertoId === paciente.id ? null : paciente.id); }} className="text-gray-400 hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                                    
                                    {/* MENÚ FLOTANTE */}
                                    {menuAbiertoId === paciente.id && (
                                        <div className="absolute right-8 top-8 w-40 bg-white dark:bg-[#1a2e20] rounded shadow-xl border z-50 overflow-hidden text-left">
                                            <button onClick={() => abrirFicha(paciente)} className="w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/10 text-sm flex gap-2"><span className="material-symbols-outlined text-[18px]">visibility</span> Ver Ficha</button>
                                            <button onClick={() => handleEliminar(paciente.id, paciente.nombre)} className="w-full px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex gap-2"><span className="material-symbols-outlined text-[18px]">delete</span> Eliminar</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL FICHA DEL PACIENTE (PASO B) --- */}
            {pacienteFicha && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPacienteFicha(null)}>
                    <div className="bg-white dark:bg-[#1a2e20] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                        {/* Cabecera Ficha */}
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#1f3325] flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`size-12 rounded-full flex items-center justify-center text-xl font-bold ${pacienteFicha.avatarColor}`}>{pacienteFicha.nombre.charAt(0)}</div>
                                <div>
                                    <h2 className="text-xl font-bold dark:text-white">{pacienteFicha.nombre}</h2>
                                    <p className="text-sm text-gray-500 font-mono">{pacienteFicha.telefono}</p>
                                </div>
                            </div>
                            <button onClick={() => setPacienteFicha(null)} className="text-gray-400 hover:text-black"><span className="material-symbols-outlined">close</span></button>
                        </div>

                        {/* Historial de Citas */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Historial de Citas</h3>
                            {historialCitas.length > 0 ? (
                                <div className="space-y-3">
                                    {historialCitas.map((cita) => (
                                        <div key={cita.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 text-primary-dark p-2 rounded-lg"><span className="material-symbols-outlined">event</span></div>
                                                <div>
                                                    <p className="font-bold text-sm dark:text-white">{new Date(cita.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                    <p className="text-xs text-gray-500">{cita.tipo}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${cita.estado === 'programada' ? 'bg-blue-50 text-blue-700' : cita.estado === 'atendida' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                {cita.estado}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
                                    <p>Este paciente no tiene citas registradas aún.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-right">
                             <Link to="/new-appointment" className="text-primary font-bold text-sm hover:underline" onClick={() => setPacienteFicha(null)}>+ Agendar nueva cita</Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};