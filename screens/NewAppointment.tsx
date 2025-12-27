import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// --- CONFIGURACIÓN GOOGLE SHEETS ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaCWqoAXba1Wo6Zz053aBh8Wu5-wyox9tlESHG_q-3l_xlfCRj8StkcUrBH_67tXIVWg/exec"; 

export const NewAppointment: React.FC = () => {
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [paciente, setPaciente] = useState('');
    const [telefono, setTelefono] = useState(''); // Nuevo campo
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [hora, setHora] = useState('09:00');
    const [duracion, setDuracion] = useState(60);
    const [tipo, setTipo] = useState('Acupuntura General');
    const [estado, setEstado] = useState('programada');
    const [notas, setNotas] = useState('');

    const [listaPacientes, setListaPacientes] = useState<{id: number, nombre: string, telefono: string, notas?: string, avatarColor: string}[]>([]);

    // --- CARGAR PACIENTES ---
    useEffect(() => {
        const guardados = localStorage.getItem('pacientesLocal');
        if (guardados) {
            setListaPacientes(JSON.parse(guardados));
        }
    }, []);

    const handleGuardar = () => {
        if (!paciente || !fecha || !hora) {
            alert("⚠️ Faltan datos obligatorios (Nombre, Fecha y Hora).");
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

        // 1. GUARDAR LA CITA EN LA AGENDA
        const citasLocales = JSON.parse(localStorage.getItem('citasLocal') || '[]');
        localStorage.setItem('citasLocal', JSON.stringify([...citasLocales, nuevaCita]));

        // 2. ACTUALIZAR O CREAR PACIENTE AUTOMÁTICAMENTE
        const directorioActual = JSON.parse(localStorage.getItem('pacientesLocal') || '[]');
        const indiceExistente = directorioActual.findIndex((p: any) => p.nombre.toLowerCase() === paciente.toLowerCase());

        let directorioActualizado;
        if (indiceExistente !== -1) {
            // Si ya existe, solo actualizamos sus notas y teléfono si se ha puesto uno nuevo
            directorioActualizado = directorioActual.map((p: any, i: number) => 
                i === indiceExistente ? { ...p, notas: notas, telefono: telefono || p.telefono } : p
            );
        } else {
            // Si NO existe, creamos el paciente nuevo con los datos del formulario
            const nuevoPaciente = {
                id: Date.now(),
                nombre: paciente,
                telefono: telefono || "Sin teléfono",
                notas: notas,
                avatarColor: "bg-primary",
                estado: "Activo",
                ultimaVisita: fecha
            };
            directorioActualizado = [...directorioActual, nuevoPaciente];
        }
        localStorage.setItem('pacientesLocal', JSON.stringify(directorioActualizado));

        // 3. GUARDADO EN NUBE
        if (GOOGLE_SCRIPT_URL) {
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(nuevaCita)
            }).catch(err => console.log("Error backup:", err));
        }

        navigate('/dashboard');
    };

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Link to="/dashboard" className="hover:text-primary transition-colors">Agenda</Link>
                    <span>/</span><span className="text-gray-900 dark:text-gray-300 font-medium">Nueva Cita</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Cita</h1>
            </div>

            <div className="bg-white dark:bg-[#1a2e20] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Paciente</label>
                        <input 
                            list="lista-pacientes" 
                            type="text" 
                            value={paciente} 
                            onChange={(e) => setPaciente(e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white outline-none focus:border-primary" 
                            placeholder="Nombre completo..." 
                        />
                        <datalist id="lista-pacientes">
                            {listaPacientes.map(p => <option key={p.id} value={p.nombre} />)}
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                        <input 
                            type="tel" 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white outline-none focus:border-primary" 
                            placeholder="600 000 000" 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Fecha</label>
                        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hora</label>
                        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Notas de la sesión</label>
                    <textarea 
                        value={notas} 
                        onChange={(e) => setNotas(e.target.value)} 
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl h-32 dark:text-white outline-none focus:border-primary" 
                        placeholder="Escribe aquí el tratamiento o diagnóstico..."
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Cancelar</button>
                    <button onClick={handleGuardar} className="px-6 py-2.5 rounded-xl font-bold bg-primary text-black flex items-center gap-2 hover:bg-primary-dark shadow-lg transition-all">
                        <span className="material-symbols-outlined">check</span> Guardar Cita
                    </button>
                </div>
            </div>
        </div>
    );
};