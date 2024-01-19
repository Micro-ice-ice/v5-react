// refactor example from https://github.com/3dgraphicsplus/MedicalToolkit/tree/master/examples/viewers_quadview
import { Stack } from 'ami.js';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux.ts';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import DicomLoader from '../helpers/DICOM/DicomLoader.ts';

export const StackContext = createContext<Stack | null>(null);

const QuadViewProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const currentPatient = useAppSelector((state) => state.currentPatient.patient);
    const currentPatientData = useLiveQuery(() => {
        return db.patientsData
            .where('id')
            .equals(currentPatient ? currentPatient.id : '')
            .first();
    }, [currentPatient]);

    const [stack, setStack] = useState<Stack | null>(null);

    useEffect(() => {
        if (currentPatientData) {
            const files = currentPatientData.files;

            DicomLoader.loadSeries(files)
                .then((series) => {
                    const loadedStack = series.stack[0];
                    loadedStack.prepare();
                    setStack(loadedStack);

                    console.log(loadedStack);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [currentPatientData]);

    return <StackContext.Provider value={stack}>{children}</StackContext.Provider>;
};

export default QuadViewProvider;
