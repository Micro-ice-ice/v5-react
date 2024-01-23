// refactor example from https://github.com/3dgraphicsplus/MedicalToolkit/tree/master/examples/viewers_quadview
import * as AMI from 'ami.js';
import { createContext, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import DicomLoader from '../helpers/Dicom/DicomLoader.ts';
import Renderer2D from '../models/Renderer2D.ts';
import Renderer3D from '../models/Renderer3D.ts';
import { helpersStatusSlice } from '../store/reducers/helpersStatus.ts';

export const StackContext = createContext<AMI.Stack | null>(null);

interface Renderers {
    r0: Renderer3D;
    r1: Renderer2D;
    r2: Renderer2D;
    r3: Renderer2D;
}

export const RenderersContext = createContext<Renderers>({ r0: {}, r1: {}, r2: {}, r3: {} });

const QuadViewProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const currentPatient = useAppSelector((state) => state.currentPatient.patient);
    const currentPatientData = useLiveQuery(() => {
        return db.patientsData
            .where('id')
            .equals(currentPatient ? currentPatient.id : '')
            .first();
    }, [currentPatient]);

    const { setStackHelpersStatus, setLocalizerHelpersStatus } = helpersStatusSlice.actions;
    const dispatch = useAppDispatch();

    const [stack, setStack] = useState<AMI.Stack | null>(null);

    useEffect(() => {
        if (currentPatientData) {
            const files = currentPatientData.files;

            DicomLoader.loadSeries(files)
                .then((series) => {
                    const loadedStack = series.stack[0];
                    loadedStack.prepare();

                    //setup status for all helpers
                    dispatch(setStackHelpersStatus(false));
                    dispatch(setLocalizerHelpersStatus(false));

                    //set new stack
                    setStack(loadedStack);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [currentPatientData, dispatch, setLocalizerHelpersStatus, setStackHelpersStatus]);

    const rendererRef = useRef<Renderers>({ r0: {}, r1: {}, r2: {}, r3: {} });

    return (
        <StackContext.Provider value={stack}>
            <RenderersContext.Provider value={rendererRef.current}>
                {children}
            </RenderersContext.Provider>
        </StackContext.Provider>
    );
};

export default QuadViewProvider;
