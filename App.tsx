import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos tus componentes tal cual los tenías antes
import { Layout } from './components/Layout';
import { Dashboard } from './screens/Dashboard';
import { PatientsList } from './screens/PatientsList';
import { NewAppointment } from './screens/NewAppointment';
import { Settings } from './screens/Settings';
import { QuickPatientAdd } from './screens/QuickPatientAdd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. RUTA RAÍZ: Si entran en la portada (/), enviarlos directos al Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 2. RUTAS DE LA APP: Todas envueltas en tu Layout (Barra lateral) */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/pacientes" element={<Layout><PatientsList /></Layout>} />
        <Route path="/new-appointment" element={<Layout><NewAppointment /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/quick-add" element={<Layout><QuickPatientAdd /></Layout>} />
        
        {/* 3. COMODÍN: Cualquier ruta rara redirige al Dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;