import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos tus componentes (asegúrate de que los nombres coincidan)
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
        {/* Si entran en la raíz, los mandamos al Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Todas tus páginas envueltas en el Layout (Sidebar) */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/pacientes" element={<Layout><PatientsList /></Layout>} />
        <Route path="/new-appointment" element={<Layout><NewAppointment /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/quick-add" element={<Layout><QuickPatientAdd /></Layout>} />
        
        {/* Si escriben una ruta mal, vuelven al inicio */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;