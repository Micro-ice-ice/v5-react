import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import AMI, { Stack } from 'ami.js';
import useCurrentPatientData from '../../hooks/useCurrentPatientData.ts';
import DicomLoader from '../../helpers/Dicom/DicomLoader.ts';
import { useAppDispatch } from '../../hooks/redux.ts';
import { helpersStatusSlice } from '../../store/reducers/helpersStatus.ts';

export const StackContext = createContext<Stack | null>(null);
const StackProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const patientData = useCurrentPatientData();

    const [stack, setStack] = useState<AMI.Stack | null>(null);

    const dispatch = useAppDispatch();
    const { setStackHelpersStatus, setLocalizerHelpersStatus } = helpersStatusSlice.actions;

    useEffect(() => {
        if (patientData) {
            const files = patientData.dicomFiles;

            DicomLoader.loadSeries(files)
                .then((series) => {
                    const loadedStack = series.stack[0];
                    loadedStack.prepare();

                    //setup status for all helpers
                    dispatch(setStackHelpersStatus(false));
                    dispatch(setLocalizerHelpersStatus(false));

                    setStack(loadedStack);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [patientData, dispatch, setLocalizerHelpersStatus, setStackHelpersStatus]);
    return <StackContext.Provider value={stack}>{children}</StackContext.Provider>;
};

export default StackProvider;
