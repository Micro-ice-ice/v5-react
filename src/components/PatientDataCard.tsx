import PatientData from '../models/PatientData.ts';
import React, { useState } from 'react';
import { Box, Button, ButtonBase, CardActions, CardContent, Typography } from '@mui/material';
import AortaSegmentDialog from './AortaSegmentDialog.tsx';
import Patient from '../models/Patient.ts';

interface PatientDataCardProps {
    patient: Patient;
    patientData: Omit<PatientData, 'aortaFiles' | 'dicomFiles'>;
}

const PatientDataCard: React.FC<PatientDataCardProps> = ({ patientData, patient }) => {
    const [open, setOpen] = useState(false);

    const handleClickSegmentAorta = () => {
        setOpen(true);
    };

    const handleClose = (threshold?: number) => {
        console.log(threshold);
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ px: '1rem', py: '0.75rem' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                    {`Дата: ${patientData.date}`}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                    {`DICOM: ${patientData.numberOfFrames} снимков`}
                </Typography>
                <ButtonBase onClick={handleClickSegmentAorta}>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                        {patientData.isAortaSegmented
                            ? `Аорта сегментирована (${patientData.aortaThreshold})`
                            : 'Аорта не сегментирована'}
                    </Typography>
                </ButtonBase>
                <AortaSegmentDialog
                    open={open}
                    onClose={handleClose}
                    patient={patient}
                    patientData={patientData}></AortaSegmentDialog>
            </CardContent>
            <CardActions>
                <Button>Загрузить</Button>
            </CardActions>
        </Box>
    );
};

export default PatientDataCard;
