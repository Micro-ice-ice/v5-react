import PatientData from '../models/PatientData.ts';
import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface PatientDataCardProps {
    patientData: Omit<PatientData, 'aortaFiles' | 'dicomFiles'>;
}

const PatientDataCard: React.FC<PatientDataCardProps> = ({ patientData }) => {
    return (
        <Card sx={{ m: 0.1, width: '100%', borderRadius: 0 }}>
            <CardActionArea>
                <CardContent sx={{ px: '1rem', py: '0.75rem' }}>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {`Дата: ${patientData.date}`}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {`DICOM: ${patientData.numberOfFrames} снимков`}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                        {patientData.isAortaSegmented
                            ? `Аорта сегментирована (${patientData.aortaThreshold!})`
                            : 'Аорта не сегментирована'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PatientDataCard;
