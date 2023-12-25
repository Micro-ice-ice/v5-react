import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import Patient from '../models/Patient.ts';
import PatientCard from './PatientCard.tsx';
import { Stack } from '@mui/material';

const PatientCardList = () => {
    const patients: Patient[] | undefined = useLiveQuery(() => {
        return db.patients.toArray((patients) => {
            return patients.map((patient) => {
                return {
                    id: patient.id,
                    name: patient.name,
                    age: patient.age,
                };
            });
        });
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
