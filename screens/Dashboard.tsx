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

    // --- LECTURA DE MEMORIA LOCAL ---
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

    const abrirMensaje = (tipo: 'whatsapp' | 'sms') => {
        if (!citaEditando) return;
        const pacientesGuardados = JSON.parse(localStorage.getItem('pacientesLocal') || '[]');
        const pacienteEncontrado = pacientesGuardados.find((p: any) => 
            p.nombre.toLowerCase() === citaEditando.paciente.toLowerCase()
        );
        
        if (!pacienteEncontrado) {
            alert("⚠️ No se encontró el teléfono de este paciente.");
            return;
        }

        const telefono = pacienteEncontrado.telefono.replace(/[^0-9]/g, ''); 
        const horaStr = decimalAString(citaEditando.horaInicio);
        const fechaStr = new Date(citaEditando.fecha).toLocaleDateString('es-ES');
        const texto = `Estimado/a ${citaEditando.paciente}, le recordamos su cita en Clinica SanCai el día ${fechaStr} a las ${horaStr}. Un saludo.`;
        
        let link = tipo === 'whatsapp' 
            ? `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`
            : `sms:${telefono}?&body=${encodeURIComponent(texto)}`;
        
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
            <div key={cita.id} onClick={(e) => { e.stopPropagation(); setCitaEditando(cita); }} className={`absolute left-1 right-1 border-l-4 rounded-r-md p-2 shadow-sm cursor-pointer hover:shadow-md transition-all z-10 text-[10px] md:text-xs flex flex-col justify-between ${colores[cita.estado]}`} style={{ top: `${top}px`, height: `${height}px` }}>
                <div className="overflow-hidden">
                    <p className={`font-bold truncate ${cita.estado === 'cancelada' ? 'line-through' : ''}`}>{cita.paciente}</p>
                    <p className="truncate opacity-80 hidden xs:block">{cita.tipo}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 opacity-70"><span className="material-symbols-outlined !text-[12px]">schedule</span>{decimalAString(cita.horaInicio)}</div>
            </div>
        );
    };

    const esHoy = (d: Date) => {
        const h = new Date();
        return d.getDate() === h.getDate() && d.getMonth() === h.getMonth() && d.getFullYear() === h.getFullYear();
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1400px] mx-auto px-2 md:px-8 py-4 md:py-6 h-full">
            {/* CABECERA */}
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-text-main-light dark:text-white">Agenda Semanal</h1>
                        <p className="text-[#63886c] dark:text-[#a0bca5] text-xs md:text-sm mt-1">Gestión de citas.</p>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-2 bg-white dark:bg-surface-dark p-1.5 rounded-xl border border-[#dce5de] dark:border-[#2c3e2e] shadow-sm">
                        <button onClick={() => setFechaActual(new Date())} className="p-2 md:p-2 hover:bg-[#f0f4f1] rounded-lg text-primary-dark font-bold"><span className="material-symbols-outlined text-[20px] md:text-[24px]">calendar_today</span></button>
                        <div className="h-6 w-px bg-[#dce5de]"></div>
                        <button onClick={() => cambiarSemana(-7)} className="p-2 hover:bg-[#f0f4f1] rounded-lg"><span className="material-symbols-outlined text-[20px] md:text-[24px]">chevron_left</span></button>
                        <div className="relative flex-1 md:flex-none text-center">
                            <input ref={dateInputRef} type="date" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20" onChange={(e) => setFechaActual(new Date(e.target.value))}/>
                            <span className="text-xs md:text-sm font-semibold px-2 whitespace-nowrap">{fechaActual.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <button onClick={() => cambiarSemana(7)} className="p-2 hover:bg-[#f0f4f1] rounded-lg"><span className="material-symbols-outlined text-[20px] md:text-[24px]">chevron_right</span></button>
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                    <button onClick={() => setFiltroEstado('todos')} className={`flex-none px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all ${filtroEstado === 'todos' ? 'bg-primary text-black' : 'bg-white border'}`}>Todos</button>
                    <button onClick={() => setFiltroEstado('programada')} className={`flex-none px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${filtroEstado === 'programada' ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}>Programada</button>
                    <button onClick={() => setFiltroEstado('atendida')} className={`flex-none px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${filtroEstado === 'atendida' ? 'border-green-500 bg-green-50' : 'bg-white'}`}>Atendida</button>
                    <button onClick={() => setFiltroEstado('cancelada')} className={`flex-none px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${filtroEstado === 'cancelada' ? 'border-red-500 bg-red-50' : 'bg-white'}`}>Cancelada</button>
                </div>
            </div>

            {/* CALENDARIO CON SCROLL */}
            <div className="flex-1 relative bg-white dark:bg-surface-dark rounded-xl border border-[#dce5de] shadow-sm overflow-hidden flex flex-col min-h-0">
                <div className="overflow-x-auto flex-1 flex flex-col scroll-smooth">
                    <div className="min-w-[800px] flex-1 flex flex-col">
                        
                        {/* Cabecera Días FIJA */}
                        <div className="grid grid-cols-[60px_1fr] border-b border-[#dce5de] bg-[#fcfdfc] dark:bg-surface-dark z-40 sticky top-0">
                            <div className="p-2 border-r border-[#dce5de] flex items-center justify-center bg-[#fcfdfc] dark:bg-surface-dark sticky left-0 z-50">
                                <span className="text-[10px] font-bold uppercase text-[#63886c]">Hora</span>
                            </div>
                            <div className="grid grid-cols-7 divide-x divide-[#dce5de]">
                                {diasSemana.map((dia, index) => (
                                    <div key={index} className={`p-2 text-center ${esHoy(dia) ? 'bg-primary/10' : ''} ${esDiaCerrado(dia) ? 'bg-gray-100 dark:bg-white/5 opacity-60' : ''}`}>
                                        <span className="block text-[10px] uppercase font-semibold text-[#63886c]">{dia.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                                        <span className="block text-base font-bold text-gray-700 dark:text-gray-200">{dia.getDate()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cuerpo con Columna de Horas FIJA */}
                        <div className="flex-1 relative">
                            <div className="grid grid-cols-[60px_1fr]">
                                
                                {/* Columna Horas Sticky Left - CORREGIDA */}
                                <div className="flex flex-col divide-y divide-[#dce5de] border-r border-[#dce5de] bg-[#fcfdfc] dark:bg-surface-dark sticky left-0 z-30 shadow-[2px_0_4px_rgba(0,0,0,0.05)]">
                                    {horasDelDia.map(hour => (
                                        <div key={hour} className="h-28 flex items-start justify-center pt-2 bg-[#fcfdfc] dark:bg-surface-dark">
                                            <span className="text-[10px] font-bold text-[#63886c] dark:text-[#a0bca5]">{hour}:00</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Rejilla de Citas */}
                                <div className="grid grid-cols-7 divide-x divide-[#dce5de] relative bg-white dark:bg-surface-dark z-10">
                                    {diasSemana.map((dia, index) => {
                                        const fechaColumna = dia.toISOString().split('T')[0];
                                        const citasDelDia = citasFiltradas.filter(c => c.fecha === fechaColumna);
                                        const cerrado = esDiaCerrado(dia);
                                        return (
                                            <div key={index} className={`relative h-full border-b border-[#dce5de] ${esHoy(dia) ? 'bg-primary/5' : ''}`}>
                                                {cerrado ? (
                                                    <div className="absolute inset-0 bg-gray-100/50 dark:bg-black/20 flex items-center justify-center z-20 backdrop-blur-[1px]">
                                                        <span className="material-symbols-outlined text-2xl opacity-20">block</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {citasDelDia.map(renderCita)}
                                                        <Link to="/new-appointment" className="absolute inset-0 hover:bg-black/5 transition-colors z-0"></Link>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE EDICIÓN */}
            {citaEditando && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setCitaEditando(null)}>
                    <div className="bg-white dark:bg-[#1a2e20] w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl p-6 md:p-8 animate-in slide-in-from-bottom md:zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold dark:text-white">Detalle de la Cita</h2>
                            <button onClick={() => setCitaEditando(null)} className="p-2 text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="space-y-5">
                            <h3 className="font-bold text-2xl dark:text-white mb-2">{citaEditando.paciente}</h3>
                            <div className="flex flex-col md:flex-row gap-2 mb-6">
                                <button onClick={() => abrirMensaje('whatsapp')} className="flex-1 flex items-center justify-center gap-2 bg-[#e8fce8] text-[#075E54] py-3 rounded-xl font-bold border border-[#075E54]/10">📱 WhatsApp</button>
                                <button onClick={() => abrirMensaje('sms')} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold border border-blue-100">SMS</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Fecha</label>
                                    <input type="date" value={citaEditando.fecha} onChange={(e) => setCitaEditando({...citaEditando, fecha: e.target.value})} className="w-full p-3 bg-gray-50 border-gray-200 border rounded-xl dark:bg-black/20 dark:border-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Hora</label>
                                    <input type="time" value={decimalAString(citaEditando.horaInicio)} onChange={(e) => setCitaEditando({...citaEditando, horaInicio: stringADecimal(e.target.value)})} className="w-full p-3 bg-gray-50 border-gray-200 border rounded-xl dark:bg-black/20 dark:border-gray-700 dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Estado</label>
                                <select value={citaEditando.estado} onChange={(e) => setCitaEditando({...citaEditando, estado: e.target.value as any})} className="w-full p-3 bg-gray-50 border-gray-200 border rounded-xl dark:bg-black/20 dark:border-gray-700 dark:text-white">
                                    <option value="programada">Confirmada</option>
                                    <option value="atendida">Atendida</option>
                                    <option value="cancelada">Cancelada</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Notas Clínicas</label>
                                <textarea value={citaEditando.notas || ''} onChange={(e) => setCitaEditando({...citaEditando, notas: e.target.value})} className="w-full p-3 bg-gray-50 border-gray-200 border rounded-xl h-24 dark:bg-black/20 dark:border-gray-700 dark:text-white" placeholder="Escribe detalles de la sesión..."></textarea>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-3 mt-8 pt-6 border-t dark:border-gray-700">
                            <button onClick={handleEliminarCita} className="order-2 md:order-1 py-3 text-red-500 font-bold flex items-center justify-center gap-1"><span className="material-symbols-outlined">delete</span> Eliminar</button>
                            <div className="order-1 md:order-2 flex gap-2">
                                <button onClick={() => setCitaEditando(null)} className="flex-1 px-6 py-3 rounded-xl bg-gray-100 font-bold">Cerrar</button>
                                <button onClick={handleActualizarCita} className="flex-1 px-6 py-3 rounded-xl bg-primary text-black font-bold shadow-lg">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};