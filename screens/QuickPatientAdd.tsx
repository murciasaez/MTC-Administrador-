import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const QuickPatientAdd: React.FC = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleGuardar = () => {
        if (!nombre || !telefono) return alert("Por favor, rellena todos los datos.");

        // 1. Creamos el nuevo paciente con datos automáticos para rellenar huecos
        const nuevoPaciente = {
            id: Date.now(), // Usamos la hora actual como ID único
            nombre: nombre,
            telefono: "+34 " + telefono,
            ultimaVisita: new Date().toISOString().split('T')[0], // Fecha de hoy
            estado: 'Activo',
            avatarColor: "bg-green-100 text-green-600" // Le damos color verde por defecto
        };

        // 2. Leemos si ya hay pacientes guardados en la memoria
        const pacientesGuardados = JSON.parse(localStorage.getItem('pacientesLocal') || '[]');
        
        // 3. Añadimos el nuevo a la lista y guardamos
        localStorage.setItem('pacientesLocal', JSON.stringify([nuevoPaciente, ...pacientesGuardados]));

        // 4. Volvemos a la lista de pacientes
        alert("¡Paciente creado con éxito!");
        navigate('/patients');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a2e20] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Cabecera */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start bg-gradient-to-r from-gray-50 to-white dark:from-[#1f3325] dark:to-[#1a2e20]">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nuevo Paciente</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ingrese los datos esenciales.</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Formulario */}
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre y Apellidos <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">person</span>
                            <input 
                                type="text" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej. María García López" 
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Teléfono Móvil <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-3 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300">
                                <span>🇪🇸 +34</span>
                            </div>
                            <input 
                                type="tel" 
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                placeholder="600 123 456" 
                                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-[#112115] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white font-mono"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Se creará la ficha básica automáticamente.</p>
                    </div>
                </div>

                {/* Botones */}
                <div className="p-6 bg-gray-50 dark:bg-[#1f3325] flex justify-end gap-3">
                    <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleGuardar} className="px-5 py-2.5 rounded-xl font-bold bg-primary hover:bg-primary-dark text-black shadow-lg shadow-primary/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                        Guardar y Asignar
                    </button>
                </div>
            </div>
        </div>
    );
};