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
import { STLLoader } from '../helpers/STLLoader';
import {
    BufferGeometry,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshNormalMaterial,
    MeshPhongMaterial,
} from 'three';

export const StackContext = createContext<AMI.Stack | null>(null);

export const AortaContext = createContext<Mesh | null>(null);

interface Renderers {
    r0: Renderer3D;
    r1: Renderer2D;
    r2: Renderer2D;
    r3: Renderer2D;
}

export const RenderersContext = createContext<Renderers>({ r0: {}, r1: {}, r2: {}, r3: {} });

const QuadViewProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const currentPatientDataId = useAppSelector(
        (state) => state.currentPatientData.patientData?.id
    );
    const currentPatientData = useLiveQuery(() => {
        return db.patientsData
            .where('id')
            .equals(currentPatientDataId ? currentPatientDataId : '')
            .first();
    }, [currentPatientDataId]);

    const { setStackHelpersStatus, setLocalizerHelpersStatus } = helpersStatusSlice.actions;
    const dispatch = useAppDispatch();

    const [stack, setStack] = useState<AMI.Stack | null>(null);
    const [aortaMesh, setAortaMesh] = useState<Mesh | null>(null);

    useEffect(() => {
        if (currentPatientData) {
            const files = currentPatientData.dicomFiles;

            DicomLoader.loadSeries(files)
                .then((series) => {
                    const loadedStack = series.stack[0];
                    loadedStack.prepare();

                    //setup status for all helpers
                    dispatch(setStackHelpersStatus(false));
                    dispatch(setLocalizerHelpersStatus(false));

                    if (currentPatientData.isAortaSegmented) {
                        const file = currentPatientData.aortaFile!;
                        const loader = new STLLoader();

                        loader.load(URL.createObjectURL(file), (geometry: BufferGeometry) => {
                            const material = new MeshLambertMaterial({
                                color: 0xf44336,
                            });

                            const mesh = new Mesh(geometry, material);

                            //set new stack
                            setStack(loadedStack);
                            setAortaMesh(mesh);
                        });
                    } else {
                        setAortaMesh(null);
                        setStack(loadedStack);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [currentPatientData, dispatch, setLocalizerHelpersStatus, setStackHelpersStatus]);

    const rendererRef = useRef<Renderers>({ r0: {}, r1: {}, r2: {}, r3: {} });

    return (
        <AortaContext.Provider value={aortaMesh}>
            <StackContext.Provider value={stack}>
                <RenderersContext.Provider value={rendererRef.current}>
                    {children}
                </RenderersContext.Provider>
            </StackContext.Provider>
        </AortaContext.Provider>
    );
};

export default QuadViewProvider;
