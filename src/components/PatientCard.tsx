import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Patient from '../models/Patient.ts';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { currentPatientSlice } from '../store/reducers/currentPatient.ts';

interface PatientCardProps {
    patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = (props: PatientCardProps) => {
    const currentPatient = useAppSelector((state) => state.currentPatient);
    const { selectPatient } = currentPatientSlice.actions;
    const dispatch = useAppDispatch();

    const handleClickCard = () => {
        if (currentPatient.patient?.id != props.patient.id) {
            dispatch(selectPatient(props.patient));
        }
    };
    return (
        // <Paper >

        // </Paper>
        <Card sx={{ m: 0.1, width: '100%', borderRadius: 0 }} onClick={handleClickCard}>
            <CardActionArea>
                <CardContent sx={{ px: '1rem', py: '0.75rem' }}>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {'Пациент: ' + props.patient.name}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {'Возраст: ' + props.patient.age}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PatientCard;
