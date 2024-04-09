import { useContext, useEffect } from 'react';
import { AortaContext, RenderersContext } from '../QuadViewProvider.tsx';

import { MeshLambertMaterial } from 'three';
// import Aorta3DVisible from './Aorta3DVisible.tsx';
import { useAppSelector } from '../../hooks/redux.ts';

const Aorta3D = () => {
    const { r0 } = useContext(RenderersContext);
    const renderer = r0;
    const aortaMesh = useContext(AortaContext);

    useEffect(() => {
        if (aortaMesh) {
            renderer.scene?.add(aortaMesh);
        }

        return () => {
            //dispose
            if (renderer.scene) {
                if (aortaMesh) {
                    renderer.scene.remove(aortaMesh);
                    aortaMesh.geometry.dispose();
                    (aortaMesh.material as MeshLambertMaterial).dispose();
                }

                // renderer.scene.remove(...renderer.scene!.children);
            }
        };
    });

    return (
        <>
            <Aorta3DVisible />
        </>
    );
};

const Aorta3DVisible = () => {
    const { aortaVisible } = useAppSelector((state) => state.visibleStatus);

    const aortaMesh = useContext(AortaContext);

    if (aortaMesh) {
        aortaMesh.visible = aortaVisible;
    }

    return <></>;
};

export default Aorta3D;
