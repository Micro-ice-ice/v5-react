import PatientData from '../models/PatientData.ts';
import React, { useState } from 'react';
import { Box, Button, ButtonBase, CardActions, CardContent, Typography } from '@mui/material';
import AortaSegmentDialog from './AortaSegmentDialog.tsx';
import Patient from '../models/Patient.ts';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { currentPatientDataSlice } from '../store/reducers/currentPatientData.ts';
import { ServiceAPI } from 'ozaki-api';
import { db } from '../db/db.ts';
import { visibleStatusSlice } from '../store/reducers/visibleStatus.ts';
import getWebSocketUrl from '../API/getUrl.ts';

interface PatientDataCardProps {
    patient: Patient;
    patientData: Omit<PatientData, 'aortaFile' | 'dicomFiles'>;
}

const PatientDataCard: React.FC<PatientDataCardProps> = ({ patientData, patient }) => {
    const currentPatientData = useAppSelector((state) => state.currentPatientData);
    const { selectPatientData } = currentPatientDataSlice.actions;
    const { setDicomVisible, setAortaVisible } = visibleStatusSlice.actions;
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const handleClickSegmentAorta = () => {
        setOpen(true);
    };

    const handleClose = (threshold?: number) => {
        setOpen(false);
        if (threshold) {
            db.patientsData.get(patientData.id).then((value) => {
                if (value) {
                    // const apiUrl = 'ws://localhost:7000/';
                    const apiUrl = getWebSocketUrl();
                    const ozakiApi = new ServiceAPI(apiUrl);

                    ozakiApi.segaorta(value.dicomFiles, threshold).then((file) => {
                        console.log(file);
                        db.patientsData
                            .update(patientData.id, {
                                isAortaSegmented: true,
                                aortaThreshold: threshold,
                                aortaFile: file,
                            })
                            .then(() => {
                                console.log('Поля успешно обновлены в базе данных');
                            })
                            .catch((error) => {
                                console.error('Ошибка при обновлении полей в базе данных:', error);
                            });
                    });
                }
            });
        }
    };

    const handleClickLoadPatientData = () => {
        if (currentPatientData.patientData?.id != patientData.id) {
            dispatch(selectPatientData(patientData));
        }

        dispatch(setDicomVisible(true));
        dispatch(setAortaVisible(true));
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
                <ButtonBase title={'Сегментировать аорту'} onClick={handleClickSegmentAorta}>
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
                <Button onClick={handleClickLoadPatientData}>Загрузить</Button>
            </CardActions>
        </Box>
    );
};

export default PatientDataCard;
