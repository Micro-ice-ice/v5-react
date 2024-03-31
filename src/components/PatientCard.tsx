import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Patient from '../models/Patient.ts';
// import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
// import { currentPatientSlice } from '../store/reducers/currentPatient.ts';
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
        <Card sx={{ m: 0.1, width: '100%', borderRadius: 0 }}>
            <CardActionArea>
                <CardContent sx={{ px: '1rem', py: '0.75rem' }}>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {'Пациент: ' + patient.name}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {'Возраст: ' + patient.age}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <PatientDataCardList patientId={patient.id} />
        </Card>
    );
};

export default PatientCard;
