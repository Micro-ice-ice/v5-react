import { useEffect } from 'react';
import { MeshLambertMaterial } from 'three';
import { useAppSelector } from '../../hooks/redux.ts';
import useRenderers from '../../hooks/useRenderers.ts';
import useAorta from '../../hooks/useAorta.ts';

const Aorta3D = () => {
    const { r0 } = useRenderers();
    const renderer = r0;
    const aortaMesh = useAorta();

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

    const aortaMesh = useAorta();

    if (aortaMesh) {
        aortaMesh.visible = aortaVisible;
    }

    return <></>;
};

export default Aorta3D;
