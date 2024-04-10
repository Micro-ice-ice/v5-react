import { useAppSelector } from './redux.ts';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';

const useCurrentPatientData = () => {
    const currentPatientDataId = useAppSelector(
        (state) => state.currentPatientData.patientData?.id
    );

    return useLiveQuery(() => {
        return db.patientsData
            .where('id')
            .equals(currentPatientDataId ? currentPatientDataId : '')
            .first();
    }, [currentPatientDataId]);
};

export default useCurrentPatientData;
