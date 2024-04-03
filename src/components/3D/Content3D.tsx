import { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { boundingBoxHelperFactory } from 'ami.js';
import { AortaContext, RenderersContext, StackContext } from '../QuadViewProvider.tsx';

const Content3D = () => {
    const { r0 } = useContext(RenderersContext);
    const renderer = r0;
    const stack = useContext(StackContext);
    const aortaMesh = useContext(AortaContext);

    useEffect(() => {
        if (stack) {
            // center 3d camera/control on the stack
            const centerLPS = stack.worldCenter();
            renderer.camera?.lookAt(centerLPS);
            renderer.camera?.updateMatrix();
            renderer.controls?.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

            const AmiBoundingBoxHelper = boundingBoxHelperFactory(THREE);
            const boxHelper = new AmiBoundingBoxHelper(stack);
            renderer.scene?.add(boxHelper);
        }

        if (aortaMesh) {
            renderer.scene?.add(aortaMesh);
        }

        return () => {
            //clear scene
            if (renderer.scene) {
                renderer.scene.remove(...renderer.scene!.children);
            }
        };
    });

    return <div></div>;
};

export default Content3D;
