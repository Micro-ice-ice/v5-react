import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import { Stack } from '@mui/material';
import PatientDataCard from './PatientDataCard.tsx';

interface PatientDataCardListProps {
    patientId: string;
}
const PatientDataCardList: React.FC<PatientDataCardListProps> = ({ patientId }) => {
    const patientDataList = useLiveQuery(() => {
        return db.patientsData
            .where('patientId')
            .equals(patientId)
            .toArray((patientDataArray) => {
                return patientDataArray.map(({ dicomFiles, aortaFiles, ...rest }) => {
                    return rest;
                });
            });
    });
    return (
        <>
            <Stack direction="column" sx={{ width: '20%', minWidth: '14rem' }}>
                {patientDataList ? (
                    patientDataList.map((patientData) => {
                        return <PatientDataCard key={patientData.id!} patientData={patientData} />;
                    })
                ) : (
                    <></>
                )}
            </Stack>
        </>
    );
};

export default PatientDataCardList;
