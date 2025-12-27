import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// --- CONFIGURACIÓN GOOGLE SHEETS (PASO C - MODO SILENCIOSO) ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaCWqoAXba1Wo6Zz053aBh8Wu5-wyox9tlESHG_q-3l_xlfCRj8StkcUrBH_67tXIVWg/exec"; 

export const NewAppointment: React.FC = () => {
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [paciente, setPaciente] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [hora, setHora] = useState('09:00');
    const [duracion, setDuracion] = useState(60);
    const [tipo, setTipo] = useState('Acupuntura General');
    const [estado, setEstado] = useState('programada');
    const [notas, setNotas] = useState('');

    // Estado para la lista de pacientes (PASO A)
    const [listaPacientes, setListaPacientes] = useState<{id: number, nombre: string}[]>([]);

    // --- CARGAR PACIENTES AL INICIAR ---
    useEffect(() => {
        const guardados = localStorage.getItem('pacientesLocal');
        if (guardados) {
            setListaPacientes(JSON.parse(guardados));
        }
    }, []);

    const handleGuardar = () => {
        if (!paciente || !fecha || !hora) {
            alert("⚠️ Faltan datos obligatorios.");
            return;
        }

        const [h, m] = hora.split(':').map(Number);
        const nuevaCita = {
            id: Date.now(),
            paciente, 
            tipo,
            estado,
            fecha,
            horaInicio: h + (m / 60),
            duracion: duracion / 60,
            notas: notas || ""
        };

        // 1. GUARDADO LOCAL (INSTANTÁNEO)
        const citasLocales = JSON.parse(localStorage.getItem('citasLocal') || '[]');
        localStorage.setItem('citasLocal', JSON.stringify([...citasLocales, nuevaCita]));

        // 2. GUARDADO EN NUBE (PASO C - SILENCIOSO)
        // Lanzamos la petición y NO esperamos (fire and forget)
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("http")) {
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(nuevaCita)
            }).catch(err => console.log("Error silencioso en backup nube:", err));
        }

        // Navegamos inmediatamente
        navigate('/dashboard');
    };

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Link to="/dashboard" className="hover:text-primary">Agenda</Link>
                    <span>/</span><span className="text-gray-900 font-medium">Nueva Cita</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Cita</h1>
            </div>

            <div className="bg-white dark:bg-[#1a2e20] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-8">
                
                {/* --- SELECTOR DE PACIENTE INTELIGENTE (PASO A) --- */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Paciente</label>
                    <div className="relative">
                        <input 
                            list="lista-pacientes" // Conecta con el datalist de abajo
                            type="text" 
                            value={paciente} 
                            onChange={(e) => setPaciente(e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white" 
                            placeholder="Escribe para buscar o selecciona..." 
                            autoComplete="off"
                        />
                        {/* Lista desplegable nativa */}
                        <datalist id="lista-pacientes">
                            {listaPacientes.map(p => (
                                <option key={p.id} value={p.nombre} />
                            ))}
                        </datalist>
                    </div>
                    <Link to="/quick-add" className="inline-flex items-center gap-1 text-primary text-sm font-bold mt-2 hover:underline">
                        <span className="material-symbols-outlined text-[16px]">add</span> Registrar nuevo paciente
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Fecha</label>
                        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hora</label>
                        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} step="900" className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Duración (min)</label>
                    <div className="flex gap-3">
                        {[30, 45, 60, 90].map(min => (
                            <button key={min} onClick={() => setDuracion(min)} className={`px-4 py-2 rounded-lg text-sm font-bold border ${duracion === min ? 'bg-primary text-black border-primary' : 'bg-white dark:bg-transparent border-gray-200 dark:text-gray-300'}`}>{min} min</button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tratamiento</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white">
                            <option>Acupuntura General</option><option>Masaje Tui Na</option><option>Ventosas</option><option>Fitoterapia</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Estado</label>
                        <select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white">
                            <option value="programada">Confirmada</option><option value="atendida">Atendida</option><option value="cancelada">Cancelada</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Notas</label>
                    <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl h-24 dark:text-white" placeholder="Detalles..."></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Cancelar</button>
                    <button onClick={handleGuardar} className="px-6 py-2.5 rounded-xl font-bold bg-primary text-black flex items-center gap-2 hover:bg-primary-dark shadow-lg">
                        <span className="material-symbols-outlined">check</span> Guardar Cita
                    </button>
                </div>
            </div>
        </div>
    );
};