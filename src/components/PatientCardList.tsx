import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import PatientCard from './PatientCard.tsx';
import { Stack } from '@mui/material';

const PatientCardList = () => {
    const patients = useLiveQuery(() => {
        return db.patients.toArray();
    });

    return (
        <>
            <Stack direction="column" sx={{ width: '20%', minWidth: '14rem' }}>
                {patients ? (
                    patients.map((patient) => {
                        return <PatientCard key={patient.id} patient={patient} />;
                    })
                ) : (
                    <></>
                )}
            </Stack>
        </>
    );
};

export default PatientCardList;
