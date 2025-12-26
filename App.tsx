import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { Layout } from './components/Layout';
import { PatientsList } from './screens/PatientsList';
import { NewAppointment } from './screens/NewAppointment';
import { QuickPatientAdd } from './screens/QuickPatientAdd';
import { Settings } from './screens/Settings';

const App: React.FC = () => {
    // Basic theme check
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/patients" element={<Layout><PatientsList /></Layout>} />
                <Route path="/new-appointment" element={<Layout><NewAppointment /></Layout>} />
                <Route path="/quick-add" element={<Layout><QuickPatientAdd /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
            </Routes>
        </Router>
    );
};

export default App;