import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- TIPOS DE DATOS ---
type Turno = {
    activo: boolean;
    entrada1: string;
    salida1: string;
    entrada2: string;
    salida2: string;
};

type HorarioSemanal = {
    [key: string]: Turno; // "lunes": { ... }, "martes": { ... }
};

export const Settings: React.FC = () => {
    const navigate = useNavigate();

    // --- ESTADOS ---
    // 1. Horarios por defecto (si no hay nada guardado)
    const [horario, setHorario] = useState<HorarioSemanal>(() => {
        const guardado = localStorage.getItem('configHorario');
        if (guardado) return JSON.parse(guardado);
        
        // Configuración inicial por defecto
        const defaultDia = { activo: true, entrada1: "09:00", salida1: "14:00", entrada2: "16:00", salida2: "20:00" };
        return {
            lunes: { ...defaultDia },
            martes: { ...defaultDia },
            miercoles: { ...defaultDia },
            jueves: { ...defaultDia },
            viernes: { ...defaultDia },
            sabado: { ...defaultDia, activo: false }, // Sábado cerrado por defecto
            domingo: { ...defaultDia, activo: false } // Domingo cerrado
        };
    });

    // 2. Lista de días bloqueados/festivos (YYYY-MM-DD)
    const [bloqueos, setBloqueos] = useState<string[]>(() => {
        const guardado = localStorage.getItem('configBloqueos');
        return guardado ? JSON.parse(guardado) : [];
    });

    // 3. Control del calendario visual (Mes que estamos viendo)
    const [fechaCalendario, setFechaCalendario] = useState(new Date());

    // --- GUARDAR CAMBIOS ---
    const handleGuardar = () => {
        localStorage.setItem('configHorario', JSON.stringify(horario));
        localStorage.setItem('configBloqueos', JSON.stringify(bloqueos));
        alert("¡Configuración guardada correctamente!");
        // Opcional: navigate('/dashboard');
    };

    // --- LÓGICA DEL HORARIO ---
    const toggleDia = (dia: string) => {
        setHorario(prev => ({
            ...prev,
            [dia]: { ...prev[dia], activo: !prev[dia].activo }
        }));
    };

    const updateHora = (dia: string, campo: keyof Turno, valor: string) => {
        setHorario(prev => ({
            ...prev,
            [dia]: { ...prev[dia], [campo]: valor }
        }));
    };

    // --- LÓGICA DEL CALENDARIO (Generador de días) ---
    const getDiasDelMes = (fecha: Date) => {
        const year = fecha.getFullYear();
        const month = fecha.getMonth();
        const primerDia = new Date(year, month, 1);
        const ultimoDia = new Date(year, month + 1, 0);
        
        const dias = [];
        // Rellenar huecos vacíos antes del día 1
        // Ajustamos para que Lunes sea 0 (0=Dom en JS, pero queremos Lunes primero visualmente)
        let diaSemanaPrimerDia = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1;
        
        for (let i = 0; i < diaSemanaPrimerDia; i++) {
            dias.push(null);
        }
        
        // Rellenar días reales
        for (let i = 1; i <= ultimoDia.getDate(); i++) {
            dias.push(new Date(year, month, i));
        }
        return dias;
    };

    const toggleBloqueo = (date: Date) => {
        const fechaStr = date.toISOString().split('T')[0];
        if (bloqueos.includes(fechaStr)) {
            setBloqueos(bloqueos.filter(b => b !== fechaStr)); // Quitar
        } else {
            setBloqueos([...bloqueos, fechaStr]); // Añadir
        }
    };

    const diasCalendario = getDiasDelMes(fechaCalendario);
    const diasSemanaNombres = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    const diasSemanaLabels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    return (
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 overflow-y-auto">
            {/* CABECERA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración de Horarios</h1>
                    <p className="text-gray-500 mt-1">Gestione la disponibilidad semanal y las excepciones puntuales.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => navigate('/dashboard')} className="px-4 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-100 bg-white border border-gray-200">
                        Cancelar
                    </button>
                    <button onClick={handleGuardar} className="px-4 py-2 rounded-lg font-bold bg-primary hover:bg-primary-dark text-black shadow-lg shadow-primary/20 flex items-center gap-2">
                        <span className="material-symbols-outlined">save</span>
                        Guardar Cambios
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* COLUMNA IZQUIERDA: HORARIO SEMANAL */}
                <div className="xl:col-span-2 bg-white dark:bg-[#1a2e20] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-primary">view_week</span>
                        <h2 className="text-xl font-bold dark:text-white">Horario Base Semanal</h2>
                    </div>

                    <div className="space-y-4">
                        {diasSemanaNombres.map((diaKey, index) => {
                            const config = horario[diaKey];
                            return (
                                <div key={diaKey} className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border transition-colors ${config.activo ? 'bg-gray-50 border-gray-200 dark:bg-black/20 dark:border-gray-700' : 'bg-transparent border-transparent opacity-60'}`}>
                                    
                                    {/* Toggle Día */}
                                    <div className="w-40 flex items-center gap-3">
                                        <button 
                                            onClick={() => toggleDia(diaKey)}
                                            className={`w-12 h-6 rounded-full relative transition-colors ${config.activo ? 'bg-primary' : 'bg-gray-300'}`}
                                        >
                                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow transition-transform ${config.activo ? 'left-7' : 'left-1'}`}></div>
                                        </button>
                                        <span className="font-bold capitalize dark:text-white">{diasSemanaLabels[index]}</span>
                                    </div>

                                    {/* Inputs de Hora */}
                                    {config.activo ? (
                                        <div className="flex flex-1 flex-wrap gap-4 items-center">
                                            <div className="flex items-center gap-2 bg-white dark:bg-[#112115] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600">
                                                <span className="material-symbols-outlined text-gray-400 text-[18px]">wb_sunny</span>
                                                <input type="time" value={config.entrada1} onChange={(e) => updateHora(diaKey, 'entrada1', e.target.value)} className="bg-transparent outline-none text-sm font-mono dark:text-white" />
                                                <span className="text-gray-400">-</span>
                                                <input type="time" value={config.salida1} onChange={(e) => updateHora(diaKey, 'salida1', e.target.value)} className="bg-transparent outline-none text-sm font-mono dark:text-white" />
                                            </div>
                                            
                                            <div className="flex items-center gap-2 bg-white dark:bg-[#112115] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600">
                                                <span className="material-symbols-outlined text-gray-400 text-[18px]">bedtime</span>
                                                <input type="time" value={config.entrada2} onChange={(e) => updateHora(diaKey, 'entrada2', e.target.value)} className="bg-transparent outline-none text-sm font-mono dark:text-white" />
                                                <span className="text-gray-400">-</span>
                                                <input type="time" value={config.salida2} onChange={(e) => updateHora(diaKey, 'salida2', e.target.value)} className="bg-transparent outline-none text-sm font-mono dark:text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-sm font-bold text-gray-400 italic">Cerrado</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* COLUMNA DERECHA: EXCEPCIONES/FESTIVOS */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#1a2e20] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-red-500">event_busy</span>
                            <h2 className="text-xl font-bold dark:text-white">Excepciones y Bloqueos</h2>
                        </div>

                        {/* Controles del Mes */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setFechaCalendario(new Date(fechaCalendario.getFullYear(), fechaCalendario.getMonth() - 1, 1))} className="p-1 hover:bg-gray-100 rounded dark:hover:bg-white/10 dark:text-white"><span className="material-symbols-outlined">chevron_left</span></button>
                            <span className="font-bold capitalize dark:text-white">{fechaCalendario.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                            <button onClick={() => setFechaCalendario(new Date(fechaCalendario.getFullYear(), fechaCalendario.getMonth() + 1, 1))} className="p-1 hover:bg-gray-100 rounded dark:hover:bg-white/10 dark:text-white"><span className="material-symbols-outlined">chevron_right</span></button>
                        </div>

                        {/* Grid Calendario */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <span key={d} className="text-xs font-bold text-gray-400">{d}</span>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {diasCalendario.map((dia, i) => {
                                if (!dia) return <div key={i}></div>;
                                const fechaStr = dia.toISOString().split('T')[0];
                                const esBloqueado = bloqueos.includes(fechaStr);
                                
                                return (
                                    <button 
                                        key={i}
                                        onClick={() => toggleBloqueo(dia)}
                                        className={`size-10 rounded-lg text-sm font-medium flex items-center justify-center transition-all ${
                                            esBloqueado 
                                            ? 'bg-red-500 text-white shadow-md shadow-red-500/30 scale-105' 
                                            : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        {dia.getDate()}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            Haz clic en un día para marcarlo como <span className="font-bold text-red-500">Cerrado/Festivo</span>.
                        </p>
                    </div>

                    {/* Lista de próximos festivos */}
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-100 dark:border-red-900/30">
                        <h3 className="text-xs font-bold uppercase text-red-800 dark:text-red-300 mb-3">Próximos Bloqueos</h3>
                        <div className="space-y-2">
                            {bloqueos.sort().slice(0, 3).map(fecha => (
                                <div key={fecha} className="flex items-center gap-2 text-sm text-red-700 dark:text-red-200">
                                    <span className="material-symbols-outlined text-[16px]">event</span>
                                    <span>{new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            ))}
                            {bloqueos.length === 0 && <span className="text-xs text-red-400 italic">No hay días bloqueados.</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};