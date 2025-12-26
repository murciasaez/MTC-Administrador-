import React from 'react';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment: string;
  status: 'Activo' | 'Pendiente' | 'Inactivo';
  image?: string;
  initials?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  type: string;
  time: string;
  status: 'Programada' | 'Atendida' | 'Cancelada';
  duration?: string;
}

export interface RouteProps {
  children?: React.ReactNode;
}