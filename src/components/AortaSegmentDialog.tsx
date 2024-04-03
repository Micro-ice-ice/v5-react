import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import PatientData from '../models/PatientData.ts';
import Patient from '../models/Patient.ts';

interface AortaSegmentDialogProps {
    open: boolean;
    onClose: (threshold?: number) => void;
    patient: Patient;
    patientData: Omit<PatientData, 'aortaFile' | 'dicomFiles'>;
}

const AortaSegmentDialog: React.FC<AortaSegmentDialogProps> = ({
    open,
    patient,
    patientData,
    onClose,
}) => {
    const [number, setNumber] = useState('20');
    const [isValid, setIsValid] = useState(true);

    const handleNumberChange = (event: { target: { value: string } }) => {
        const inputNumber = parseInt(event.target.value);
        setIsValid(inputNumber >= 10 && inputNumber <= 70);
        setNumber(event.target.value);
    };

    const handleClose = () => {
        onClose();
    };

    const handleClickOk = () => {
        const threshold = parseInt(number);
        onClose(threshold);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Сегментирование аорты</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Сегментация аорты для пациента ${patient.name} для файлов от ${patientData.date} (${patientData.numberOfFrames} снимков)`}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="number"
                    label="Порог сегментации"
                    type="number"
                    value={number}
                    error={!isValid}
                    onChange={handleNumberChange}
                    fullWidth
                    helperText={!isValid && 'Пожалуйста, введите число в интервале от 10 до 70.'}
                    inputProps={{
                        inputMode: 'numeric', // Использование числовой клавиатуры
                        pattern: '[0-9]*', // Ограничение на ввод только числовых символов
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleClickOk} color="primary" disabled={!isValid}>
                    Сегментировать
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AortaSegmentDialog;
