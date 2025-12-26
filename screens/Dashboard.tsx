import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Definimos los tipos de datos para nuestras citas
type Cita = {
    id: number;
    paciente: string;
    tipo: string;
    estado: 'programada' | 'atendida' | 'cancelada';
    dia: number; // 0=Lunes, 1=Martes, etc.
    horaInicio: number; // Ejemplo: 9.0 para las 09:00
    duracion: number; // En horas
};

// 2. Datos de prueba (Luego esto vendrá de Google Sheets)
const CITAS_INICIALES: Cita[] = [
    { id: 1, paciente: "Maria G.", tipo: "Consulta General", estado: "programada", dia: 0, horaInicio: 9, duracion: 1 },
    { id: 2, paciente: "Roberto F.", tipo: "Masaje Tui Na", estado: "atendida", dia: 0, horaInicio: 13, duracion: 1 },
    { id: 3, paciente: "Juan P.", tipo: "Acupuntura", estado: "cancelada", dia: 1, horaInicio: 8, duracion: 1 },
    { id: 4, paciente: "Elena D.", tipo: "Fitoterapia", estado: "programada", dia: 1, horaInicio: 11, duracion: 1.5 },
    { id: 5, paciente: "Carlos T.", tipo: "Ventosas", estado: "programada", dia: 2, horaInicio: 9, duracion: 1 },
    { id: 6, paciente: "Ana R.", tipo: "Masaje", estado: "atendida", dia: 3, horaInicio: 8, duracion: 1 },
    { id: 7, paciente: "Pedro S.", tipo: "Masaje", estado: "programada", dia: 4, horaInicio: 11, duracion: 1 },
    { id: 8, paciente: "Sofia L.", tipo: "Emergencia", estado: "programada", dia: 5, horaInicio: 8, duracion: 1 },
];

export const Dashboard: React.FC = () => {
    // ESTADOS: Aquí guardamos la memoria de la pantalla
    const [filtroEstado, setFiltroEstado] = useState<'todos' | 'programada' | 'atendida' | 'cancelada'>('todos');
    const [semanaActual, setSemanaActual] = useState(new Date());

    // FUNCIONES AUXILIARES
    const cambiarSemana = (dias: number) => {
        const nuevaFecha = new Date(semanaActual);
        nuevaFecha.setDate(semanaActual.getDate() + dias);
        setSemanaActual(nuevaFecha);
    };

    // Filtramos las citas según el botón pulsado
    const citasVisibles = CITAS_INICIALES.filter(cita => 
        filtroEstado === 'todos' ? true : cita.estado === filtroEstado
    );

    // Función para pintar una cita en el calendario
    const renderCita = (cita: Cita) => {
        // Colores según estado
        const colores = {
            programada: "bg-blue-50 border-blue-400 text-blue-900",
            atendida: "bg-green-50 border-green-500 text-green-900",
            cancelada: "bg-gray-100 border-gray-400 text-gray-500 opacity-70"
        };
        
        // Calculamos posición vertical (top) y altura (height)
        // Asumimos que el calendario empieza a las 8:00
        const top = (cita.horaInicio - 8) * 112 + 10; // 112px es la altura aproximada de una hora
        const height = cita.duracion * 112 - 10;

        return (
            <div key={cita.id} 
                 className={`absolute left-1 right-1 border-l-4 rounded-r-md p-2 shadow-sm cursor-pointer hover:shadow-md transition-all z-10 text-xs flex flex-col justify-between ${colores[cita.estado]}`}
                 style={{ top: `${top}px`, height: `${height}px` }}>
                
                <div>
                    <p className={`font-bold truncate ${cita.estado === 'cancelada' ? 'line-through' : ''}`}>{cita.paciente}</p>
                    <p className="truncate opacity-80">{cita.tipo}</p>
                </div>
                
                <div className="flex items-center gap-1 mt-1 opacity-70">
                   <span className="material-symbols-outlined !text-[12px]">schedule</span> 
                   {cita.horaInicio}:00 - {cita.horaInicio + cita.duracion}:00
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 h-full">
            
            {/* --- CABECERA --- */}
            <div className="flex flex-col gap-6 mb-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-main-light dark:text-white">Agenda Semanal</h1>
                        <p className="text-[#63886c] dark:text-[#a0bca5] text-sm mt-1">Gestión de citas y disponibilidad.</p>
                    </div>
                    
                    {/* CONTROLES DE FECHA */}
                    <div className="flex items-center gap-3 bg-surface-light dark:bg-surface-dark p-1.5 rounded-xl border border-[#dce5de] dark:border-[#2c3e2e] shadow-sm">
                        <button onClick={() => setSemanaActual(new Date())} className="p-2 hover:bg-[#f0f4f1] rounded-lg" title="Ir a hoy">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </button>
                        <div className="h-6 w-px bg-[#dce5de]"></div>
                        <button onClick={() => cambiarSemana(-7)} className="p-2 hover:bg-[#f0f4f1] rounded-lg">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="text-sm font-semibold px-2 min-w-[140px] text-center select-none">
                            {semanaActual.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} - Semana
                        </span>
                        <button onClick={() => cambiarSemana(7)} className="p-2 hover:bg-[#f0f4f1] rounded-lg">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* --- FILTROS --- */}
                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => setFiltroEstado('todos')} 
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${filtroEstado === 'todos' ? 'bg-primary text-black scale-105' : 'bg-white border hover:border-primary'}`}>
                        <span>Todos</span>
                    </button>
                    
                    <button onClick={() => setFiltroEstado('programada')} 
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtroEstado === 'programada' ? 'border-blue-500 bg-blue-50' : 'bg-white hover:border-primary'}`}>
                        <span className="size-2 rounded-full bg-blue-400"></span>
                        <span>Programada</span>
                    </button>

                    <button onClick={() => setFiltroEstado('atendida')} 
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtroEstado === 'atendida' ? 'border-green-500 bg-green-50' : 'bg-white hover:border-primary'}`}>
                        <span className="size-2 rounded-full bg-green-500"></span>
                        <span>Atendida</span>
                    </button>

                    <button onClick={() => setFiltroEstado('cancelada')} 
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtroEstado === 'cancelada' ? 'border-red-500 bg-red-50' : 'bg-white hover:border-primary'}`}>
                        <span className="size-2 rounded-full bg-red-400"></span>
                        <span>Cancelada</span>
                    </button>
                </div>
            </div>

            {/* --- CALENDARIO (GRILLA) --- */}
            <div className="flex-1 relative bg-white dark:bg-surface-dark rounded-xl border border-[#dce5de] shadow-sm overflow-hidden flex flex-col min-h-0">
                
                {/* Cabecera de días */}
                <div className="grid grid-cols-[80px_1fr] border-b border-[#dce5de] bg-[#fcfdfc] z-10 sticky top-0">
                    <div className="p-4 border-r border-[#dce5de] flex items-center justify-center">
                        <span className="text-xs font-bold uppercase text-[#63886c]">Hora</span>
                    </div>
                    <div className="grid grid-cols-7 divide-x divide-[#dce5de]">
                        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, index) => (
                            <div key={index} className="p-3 text-center">
                                <span className="block text-xs uppercase text-[#63886c] font-semibold">{dia}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cuerpo del calendario */}
                <div className="flex-1 overflow-y-auto relative">
                    <div className="grid grid-cols-[80px_1fr]">
                        
                        {/* Columna de Horas (8:00 a 15:00) */}
                        <div className="flex flex-col divide-y divide-[#dce5de] border-r border-[#dce5de] bg-[#fcfdfc]">
                            {[8,9,10,11,12,13,14,15].map(hour => (
                                <div key={hour} className="h-28 flex items-start justify-center pt-2">
                                    <span className="text-xs font-medium text-[#63886c]">{hour}:00</span>
                                </div>
                            ))}
                        </div>

                        {/* Columnas de Días */}
                        <div className="grid grid-cols-7 divide-x divide-[#dce5de] relative bg-white">
                            {/* Generamos 7 columnas (Lunes a Domingo) */}
                            {[0,1,2,3,4,5,6].map(diaIndex => (
                                <div key={diaIndex} className="relative h-full border-b border-[#dce5de]">
                                    {/* Aquí filtramos y pintamos solo las citas de ESTE día */}
                                    {citasVisibles.filter(c => c.dia === diaIndex).map(renderCita)}
                                    
                                    {/* Botón flotante invisible para añadir cita */}
                                    <Link to="/new-appointment" className="absolute inset-0 hover:bg-black/5 transition-colors group">
                                        <div className="hidden group-hover:flex absolute top-2 right-2 text-primary">
                                            <span className="material-symbols-outlined">add</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
