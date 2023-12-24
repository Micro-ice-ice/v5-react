import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Patient from '../models/Patient.ts';

interface PatientCardProps extends Patient {}

const PatientCard: React.FC<PatientCardProps> = (props: PatientCardProps) => {
    return (
        // <Paper >

        // </Paper>
        <Card sx={{ m: 0.1, width: '100%', borderRadius: 0 }}>
            <CardActionArea>
                <CardContent sx={{ px: '1rem', py: '0.75rem' }}>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {'Пациент: ' + props.name}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {'Возраст: ' + props.age}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PatientCard;
