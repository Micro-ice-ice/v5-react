import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Patient from '../models/Patient.ts';
// import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
// import { currentPatientSlice } from '../store/reducers/currentPatientData.ts';
import PatientDataCardList from './PatientDataCardList.tsx';

interface PatientCardProps {
    patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
    // const currentPatient = useAppSelector((state) => state.currentPatient);
    // const { selectPatient } = currentPatientSlice.actions;
    // const dispatch = useAppDispatch();
    //
    // const handleClickCard = () => {
    //     if (currentPatient.patient?.id != patient.id) {
    //         dispatch(selectPatient(patient));
    //     }
    // };
    return (
        <Card sx={{ m: 0.5, borderRadius: 0, border: 0.5 }}>
            <CardContent sx={{ px: '1rem', py: '0.75rem' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                    {'Пациент: ' + patient.name}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                    {'Возраст: ' + patient.age}
                </Typography>
            </CardContent>
            <Card sx={{ m: 0.5, borderRadius: 0, border: 0.5 }}>
                <PatientDataCardList patient={patient} />
            </Card>
        </Card>
    );
};

export default PatientCard;
