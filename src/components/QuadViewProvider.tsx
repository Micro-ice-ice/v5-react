// refactor example from https://github.com/3dgraphicsplus/MedicalToolkit/tree/master/examples/viewers_quadview
import * as AMI from 'ami.js';
import { createContext, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../hooks/redux.ts';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import DicomLoader from '../helpers/DICOM/DicomLoader.ts';
import Renderer2D from '../models/Renderer2D.ts';

export const StackContext = createContext<AMI.Stack | null>(null);

interface StackHelpers {
    stackHelperAxial?: AMI.StackHelper;
    stackHelperSagittal?: AMI.StackHelper;
    stackHelperCoronal?: AMI.StackHelper;
}

export const StackHelpersContext = createContext<StackHelpers>({});

const QuadViewProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const currentPatient = useAppSelector((state) => state.currentPatient.patient);
    const currentPatientData = useLiveQuery(() => {
        return db.patientsData
            .where('id')
            .equals(currentPatient ? currentPatient.id : '')
            .first();
    }, [currentPatient]);

    const [stack, setStack] = useState<AMI.Stack | null>(null);

    useEffect(() => {
        if (currentPatientData) {
            const files = currentPatientData.files;

            DicomLoader.loadSeries(files)
                .then((series) => {
                    const loadedStack = series.stack[0];
                    loadedStack.prepare();
                    setStack(loadedStack);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [currentPatientData]);

    return (
        <StackContext.Provider value={stack}>
            <StackHelpersContext.Provider value={stackHelpersRef.current}>
                {children}
            </StackHelpersContext.Provider>
        </StackContext.Provider>
    );
};

export default QuadViewProvider;
