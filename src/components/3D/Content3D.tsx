import React, { useContext, useEffect } from 'react';
import * as AMI from 'ami.js';
import { RenderersContext, StackContext } from '../QuadViewProvider.tsx';

const Content3D = () => {
    const { r0, r1, r2, r3 } = useContext(RenderersContext);
    const renderer = r0;
    const stack = useContext(StackContext);

    useEffect(() => {
        if (stack) {
            // center 3d camera/control on the stack
            const centerLPS = stack.worldCenter();
            renderer.camera?.lookAt(centerLPS);
            renderer.camera?.updateMatrix();
            renderer.controls?.target.set(centerLPS.x, centerLPS.y, centerLPS.z);

            const boxHelper = new AMI.BoundingBoxHelper(stack);
            renderer.scene?.add(boxHelper);
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
