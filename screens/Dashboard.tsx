import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- TIPOS ---
type Cita = {
    id: number;
    paciente: string;
    tipo: string;
    estado: 'programada' | 'atendida' | 'cancelada';
    fecha: string; 
    horaInicio: number; 
    duracion: number; 
    notas?: string;
};
type Turno = { activo: boolean; entrada1: string; salida1: string; entrada2: string; salida2: string; };
type HorarioSemanal = { [key: string]: Turno; };

export const Dashboard: React.FC = () => {
    // --- ESTADOS ---
    const [filtroEstado, setFiltroEstado] = useState<'todos' | 'programada' | 'atendida' | 'cancelada'>('todos');
    const [fechaActual, setFechaActual] = useState(new Date());
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [citaEditando, setCitaEditando] = useState<Cita | null>(null);
    
    // Configuración
    const [configHorario, setConfigHorario] = useState<HorarioSemanal | null>(null);
    const [configBloqueos, setConfigBloqueos] = useState<string[]>([]);

    // --- LECTURA DE MEMORIA LOCAL (Tu sistema actual que funciona bien) ---
    const [citas, setCitas] = useState<Cita[]>(() => {
        try {
            const guardadas = localStorage.getItem('citasLocal');
            return guardadas ? JSON.parse(guardadas) : [];
        } catch (e) { return []; }
    });

    // --- CARGAR CONFIGURACIÓN ---
    useEffect(() => {
        const horarioGuardado = localStorage.getItem('configHorario');
        const bloqueosGuardados = localStorage.getItem('configBloqueos');
        if (horarioGuardado) setConfigHorario(JSON.parse(horarioGuardado));
        if (bloqueosGuardados) setConfigBloqueos(JSON.parse(bloqueosGuardados));
    }, []);

    // --- GUARDADO LOCAL ---
    const actualizarMemoria = (nuevasCitas: Cita[]) => {
        setCitas(nuevasCitas);
        localStorage.setItem('citasLocal', JSON.stringify(nuevasCitas));
    };

    const handleActualizarCita = () => {
        if (!citaEditando) return;
        const nuevasCitas = citas.map(c => c.id === citaEditando.id ? citaEditando : c);
        actualizarMemoria(nuevasCitas);
        setCitaEditando(null);
    };

    const handleEliminarCita = () => {
        if (!citaEditando) return;
        if (confirm("¿Seguro que quieres borrar esta cita?")) {
            const nuevasCitas = citas.filter(c => c.id !== citaEditando.id);
            actualizarMemoria(nuevasCitas);
            setCitaEditando(null);
        }
    };

    // --- NUEVO: FUNCIÓN PARA ENVIAR MENSAJES 📱 ---
    const abrirMensaje = (tipo: 'whatsapp' | 'sms') => {
        if (!citaEditando) return;
        
        // 1. Buscamos el teléfono del paciente en la base de datos local
        const pacientesGuardados = JSON.parse(localStorage.getItem('pacientesLocal') || '[]');
        // Buscamos el paciente por nombre (asegurándonos de que coincida mayúsculas/minúsculas)
        const pacienteEncontrado = pacientesGuardados.find((p: any) => 
            p.nombre.toLowerCase() === citaEditando.paciente.toLowerCase()
        );
        
        if (!pacienteEncontrado) {
            alert("⚠️ No se encontró el teléfono de este paciente en el directorio.\nAsegúrate de que el nombre coincide exactamente.");
            return;
        }

        // Limpiamos el teléfono (quitamos espacios y símbolos)
        const telefono = pacienteEncontrado.telefono.replace(/[^0-9]/g, ''); 
        
        // Preparamos el mensaje
        const horaStr = decimalAString(citaEditando.horaInicio);
        const fechaStr = new Date(citaEditando.fecha).toLocaleDateString('es-ES');
        const texto = `Estimado/a ${citaEditando.paciente}, le recordamos su cita en Clinica SanCai el día ${fechaStr} a las ${horaStr}. Un saludo.`;
        
        // Abrimos el enlace
        let link = '#';
        if (tipo === 'whatsapp') {
            link = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
        } else {
            // Para SMS
            link = `sms:${telefono}?&body=${encodeURIComponent(texto)}`;
        }
        
        window.open(link, '_blank');
    };

    // --- AYUDANTES VISUALES ---
    const decimalAString = (decimal: number) => {
        const horas = Math.floor(decimal);
        const minutos = Math.round((decimal % 1) * 60);
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    };
    const stringADecimal = (str: string) => {
        const [h, m] = str.split(':').map(Number);
        return h + (m / 60);
    };
    const getLunesSemana = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
    const lunesSemana = getLunesSemana(fechaActual);
    const diasSemana = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(lunesSemana);
        d.setDate(lunesSemana.getDate() + i);
        return d;
    });
    const cambiarSemana = (dias: number) => {
        const nueva = new Date(fechaActual);
        nueva.setDate(fechaActual.getDate() + dias);
        setFechaActual(nueva);
    };
    const esDiaCerrado = (fecha: Date) => {
        const fechaStr = fecha.toISOString().split('T')[0];
        if (configBloqueos.includes(fechaStr)) return true;
        if (configHorario) {
            const diasIngles = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
            const diaNombre = diasIngles[fecha.getDay()];
            if (configHorario[diaNombre] && !configHorario[diaNombre].activo) return true;
        }
        return false;
    };
    const horasDelDia = Array.from({ length: 14 }, (_, i) => i + 8); 
    const citasFiltradas = citas.filter(cita => filtroEstado === 'todos' ? true : cita.estado === filtroEstado);
    const renderCita = (cita: Cita) => {
        const colores = {
            programada: "bg-blue-50 border-blue-400 text-blue-900",
            atendida: "bg-green-50 border-green-500 text-green-900",
            cancelada: "bg-gray-100 border-gray-400 text-gray-500 opacity-70"
        };
        const top = (cita.horaInicio - 8) * 112 + 10;
        const height = cita.duracion * 112 - 10;
        return (
            <div key={cita.id} onClick={(e) => { e.stopPropagation(); setCitaEditando(cita); }} className={`absolute left-1 right-1 border-l-4 rounded-r-md p-2 shadow-sm cursor-pointer hover:shadow-md transition-all z-10 text-xs flex flex-col justify-between ${colores[cita.estado]}`} style={{ top: `${top}px`, height: `${height}px` }}>
                <div><p className={`font-bold truncate ${cita.estado === 'cancelada' ? 'line-through' : ''}`}>{cita.paciente}</p><p className="truncate opacity-80">{cita.tipo}</p></div>
                <div className="flex items-center gap-1 mt-1 opacity-70"><span className="material-symbols-outlined !text-[12px]">schedule</span>{decimalAString(cita.horaInicio)}</div>
            </div>
        );
    };
    const esHoy = (d: Date) => {
        const h = new Date();
        return d.getDate() === h.getDate() && d.getMonth() === h.getMonth() && d.getFullYear() === h.getFullYear();
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 h-full">
            {/* CABECERA */}
            <div className="flex flex-col gap-6 mb-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-main-light dark:text-white">Agenda Semanal</h1><p className="text-[#63886c] dark:text-[#a0bca5] text-sm mt-1">Gestión de citas y disponibilidad.</p></div>
                    <div className="flex items-center gap-3 bg-white dark:bg-surface-dark p-1.5 rounded-xl border border-[#dce5de] dark:border-[#2c3e2e] shadow-sm relative">
                        <button onClick={() => setFechaActual(new Date())} className="p-2 hover:bg-[#f0f4f1] rounded-lg text-primary-dark font-bold"><span className="material-symbols-outlined">calendar_today</span></button>
                        <div className="h-6 w-px bg-[#dce5de]"></div>
                        <button onClick={() => cambiarSemana(-7)} className="p-2 hover:bg-[#f0f4f1] rounded-lg"><span className="material-symbols-outlined">chevron_left</span></button>
                        <div className="relative group">
                            <input ref={dateInputRef} type="date" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20" onChange={(e) => setFechaActual(new Date(e.target.value))}/>
                            <span className="text-sm font-semibold px-2 min-w-[140px] text-center select-none cursor-pointer flex items-center justify-center gap-2">{fechaActual.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} <span className="text-xs opacity-50 bg-gray-100 px-1 rounded">▼</span></span>
                        </div>
                        <button onClick={() => cambiarSemana(7)} className="p-2 hover:bg-[#f0f4f1] rounded-lg"><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => setFiltroEstado('todos')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${filtroEstado === 'todos' ? 'bg-primary text-black scale-105' : 'bg-white border hover:border-primary'}`}><span>Todos</span></button>
                    <button onClick={() => setFiltroEstado('programada')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtroEstado === 'programada' ? 'border-blue-500 bg-blue-50' : 'bg-white hover:border-primary'}`}><span className="size-2 rounded-full bg-blue-400"></span><span>Programada</span></button>
                    <button onClick={() => setFiltroEstado('atendida')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtroEstado === 'atendida' ? 'border-green-500 bg-green-50' : 'bg-white hover:border-primary'}`}><span className="size-2 rounded-full bg-green-500"></span><span>Atendida</span></button>
                    <button onClick={() => setFiltroEstado('cancelada')} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtroEstado === 'cancelada' ? 'border-red-500 bg-red-50' : 'bg-white hover:border-primary'}`}><span className="size-2 rounded-full bg-red-400"></span><span>Cancelada</span></button>
                </div>
            </div>

            {/* CALENDARIO */}
            <div className="flex-1 relative bg-white dark:bg-surface-dark rounded-xl border border-[#dce5de] shadow-sm overflow-hidden flex flex-col min-h-0">
                <div className="grid grid-cols-[80px_1fr] border-b border-[#dce5de] bg-[#fcfdfc] z-10 sticky top-0">
                    <div className="p-4 border-r border-[#dce5de] flex items-center justify-center"><span className="text-xs font-bold uppercase text-[#63886c]">Hora</span></div>
                    <div className="grid grid-cols-7 divide-x divide-[#dce5de]">
                        {diasSemana.map((dia, index) => {
                            const esHoyDia = esHoy(dia);
                            const cerrado = esDiaCerrado(dia);
                            return <div key={index} className={`p-3 text-center transition-colors ${esHoyDia ? 'bg-primary/10' : ''} ${cerrado ? 'bg-gray-100 opacity-60' : ''}`}><span className={`block text-xs uppercase font-semibold ${esHoyDia ? 'text-primary-dark' : 'text-[#63886c]'}`}>{dia.toLocaleDateString('es-ES', { weekday: 'short' })}</span><span className={`block text-lg font-bold ${esHoyDia ? 'text-primary-dark' : 'text-gray-700'}`}>{dia.getDate()}</span></div>;
                        })}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto relative">
                    <div className="grid grid-cols-[80px_1fr]">
                        <div className="flex flex-col divide-y divide-[#dce5de] border-r border-[#dce5de] bg-[#fcfdfc]">
                            {horasDelDia.map(hour => <div key={hour} className="h-28 flex items-start justify-center pt-2"><span className="text-xs font-medium text-[#63886c]">{hour}:00</span></div>)}
                        </div>
                        <div className="grid grid-cols-7 divide-x divide-[#dce5de] relative bg-white">
                            {diasSemana.map((dia, index) => {
                                const fechaColumna = dia.toISOString().split('T')[0];
                                const citasDelDia = citasFiltradas.filter(c => c.fecha === fechaColumna);
                                const cerrado = esDiaCerrado(dia);
                                return <div key={index} className={`relative h-full border-b border-[#dce5de] ${esHoy(dia) ? 'bg-primary/5' : ''}`}>
                                    {cerrado ? <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center z-20 backdrop-blur-[1px]"><div className="flex flex-col items-center opacity-40"><span className="material-symbols-outlined text-4xl mb-1">block</span></div></div> : <>{citasDelDia.map(renderCita)}<Link to="/new-appointment" className="absolute inset-0 hover:bg-black/5 transition-colors group z-0"><div className="hidden group-hover:flex absolute top-2 right-2 text-primary opacity-50"><span className="material-symbols-outlined">add_circle</span></div></Link></>}
                                </div>;
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL DE EDICIÓN CON WHATSAPP/SMS (Sin URL externa) --- */}
            {citaEditando && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1a2e20] w-full max-w-md rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold dark:text-white">Editar Cita</h2>
                            <button onClick={() => setCitaEditando(null)} className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg dark:text-white">{citaEditando.paciente}</h3>
                            
                            {/* BOTONES NUEVOS DE CONTACTO 📱 */}
                            <div className="flex gap-2 mb-4">
                                <button onClick={() => abrirMensaje('whatsapp')} className="flex-1 flex items-center justify-center gap-2 bg-[#DCF8C6] text-[#075E54] py-2 rounded-lg font-bold hover:bg-[#cbf5ad] transition-colors border border-[#075E54]/10">
                                    <span className="text-lg">📱</span> WhatsApp
                                </button>
                                <button onClick={() => abrirMensaje('sms')} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors border border-blue-200">
                                    <span className="material-symbols-outlined text-[18px]">sms</span> SMS
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" value={citaEditando.fecha} onChange={(e) => setCitaEditando({...citaEditando, fecha: e.target.value})} className="w-full p-2 bg-gray-50 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white" />
                                <input type="time" value={decimalAString(citaEditando.horaInicio)} onChange={(e) => setCitaEditando({...citaEditando, horaInicio: stringADecimal(e.target.value)})} className="w-full p-2 bg-gray-50 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white" />
                            </div>
                            <select value={citaEditando.estado} onChange={(e) => setCitaEditando({...citaEditando, estado: e.target.value as any})} className="w-full p-2 bg-gray-50 border rounded dark:bg-black/20 dark:border-gray-700 dark:text-white">
                                <option value="programada">Confirmada</option>
                                <option value="atendida">Atendida</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                            <textarea value={citaEditando.notas || ''} onChange={(e) => setCitaEditando({...citaEditando, notas: e.target.value})} className="w-full p-2 bg-gray-50 border rounded h-20 dark:bg-black/20 dark:border-gray-700 dark:text-white" placeholder="Notas..."></textarea>
                        </div>
                        <div className="flex justify-between mt-6 pt-4 border-t dark:border-gray-700">
                            <button onClick={handleEliminarCita} className="text-red-500 font-bold flex items-center gap-1"><span className="material-symbols-outlined">delete</span> Eliminar</button>
                            <div className="flex gap-2">
                                <button onClick={() => setCitaEditando(null)} className="px-4 py-2 rounded bg-gray-100 font-bold">Cancelar</button>
                                <button onClick={handleActualizarCita} className="px-4 py-2 rounded bg-primary text-black font-bold">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};