import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import { Stack } from '@mui/material';
import PatientDataCard from './PatientDataCard.tsx';
import Patient from '../models/Patient.ts';

interface PatientDataCardListProps {
    patient: Patient;
}
const PatientDataCardList: React.FC<PatientDataCardListProps> = ({ patient }) => {
    const patientDataList = useLiveQuery(() => {
        return db.patientsData
            .where('patientId')
            .equals(patient.id)
            .toArray((patientDataArray) => {
                return patientDataArray.map(({ dicomFiles, aortaFiles, ...rest }) => {
                    return rest;
                });
            });
    });
    return (
        <>
            <Stack direction="column" sx={{ width: '100%' }}>
                {patientDataList ? (
                    patientDataList.map((patientData) => {
                        return (
                            <PatientDataCard
                                key={patientData.id!}
                                patient={patient}
                                patientData={patientData}
                            />
                        );
                    })
                ) : (
                    <></>
                )}
            </Stack>
        </>
    );
};

export default PatientDataCardList;
