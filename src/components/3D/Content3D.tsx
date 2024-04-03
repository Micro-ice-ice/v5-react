import { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { BoundingBoxHelper, boundingBoxHelperFactory } from 'ami.js';
import { AortaContext, RenderersContext, StackContext } from '../QuadViewProvider.tsx';
import { MeshLambertMaterial } from 'three';

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
            const boxHelper: BoundingBoxHelper = new AmiBoundingBoxHelper(stack);
            renderer.boxHelper = boxHelper;
            renderer.scene?.add(boxHelper);
        }

        if (aortaMesh) {
            renderer.scene?.add(aortaMesh);
        }

        return () => {
            //clear scene
            if (renderer.scene) {
                if (renderer.boxHelper) {
                    renderer.scene.remove(renderer.boxHelper);
                    renderer.boxHelper.dispose();
                }
                if (aortaMesh) {
                    console.log('clear');
                    renderer.scene.remove(aortaMesh);
                    aortaMesh.geometry.dispose();
                    (aortaMesh.material as MeshLambertMaterial).dispose();
                }

                // renderer.scene.remove(...renderer.scene!.children);
            }
        };
    });

    return <div></div>;
};

export default Content3D;
