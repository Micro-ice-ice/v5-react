import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import PatientCard from './PatientCard.tsx';
import { Stack } from '@mui/material';

const PatientCardList = () => {
    const patients = useLiveQuery(() => {
        return db.patients.toArray();
    });

    return (
        <div style={{ overflowY: 'auto', width: '18%' }}>
            <Stack direction="column">
                {patients ? (
                    patients.map((patient) => {
                        return <PatientCard key={patient.id} patient={patient} />;
                    })
                ) : (
                    <></>
                )}
            </Stack>
        </div>
    );
};

export default PatientCardList;
