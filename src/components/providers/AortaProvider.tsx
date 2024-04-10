import useCurrentPatientData from '../../hooks/useCurrentPatientData.ts';
import { createContext, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { BufferGeometry, Mesh, MeshLambertMaterial } from 'three';
import { STLLoader } from '../../helpers/STLLoader';

export const AortaContext = createContext<Mesh | null>(null);

const AortaProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const materialRef = useRef(
        new MeshLambertMaterial({
            color: 0xf44336,
        })
    );

    const patientData = useCurrentPatientData();

    const [aorta, setAorta] = useState<Mesh | null>(null);
    const aortaRef = useRef<Mesh | null>(null);

    useEffect(() => {
        if (aortaRef.current) {
            aortaRef.current.geometry.dispose();
        }
    }, [aorta]);

    useEffect(() => {
        if (patientData && patientData.isAortaSegmented) {
            const file = patientData.aortaFile!;
            const loader = new STLLoader();

            loader.load(URL.createObjectURL(file), (geometry: BufferGeometry) => {
                const mesh = new Mesh(geometry, materialRef.current);
                aortaRef.current = mesh;
                setAorta(mesh);
            });
        } else {
            aortaRef.current = null;
            setAorta(null);
        }
    }, [patientData]);

    return <AortaContext.Provider value={aorta}>{children}</AortaContext.Provider>;
};

export default AortaProvider;
