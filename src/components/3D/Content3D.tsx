import { useEffect } from 'react';
import * as THREE from 'three';
import { BoundingBoxHelper, boundingBoxHelperFactory } from 'ami.js';
import { useAppSelector } from '../../hooks/redux.ts';
import useRenderers from '../../hooks/useRenderers.ts';
import useStack from '../../hooks/useStack.ts';

const Content3D = () => {
    const { r0 } = useRenderers();
    const renderer = r0;
    const stack = useStack();

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

        return () => {
            //clear scene
            if (renderer.scene) {
                if (renderer.boxHelper) {
                    renderer.scene.remove(renderer.boxHelper);
                    renderer.boxHelper.dispose();
                }
            }
        };
    });

    const { dicomVisible } = useAppSelector((state) => state.visibleStatus);

    useEffect(() => {
        if (renderer.boxHelper) {
            if (dicomVisible) {
                renderer.scene?.add(renderer.boxHelper);
            } else {
                renderer.scene?.remove(renderer.boxHelper);
            }
        }
    }, [dicomVisible]);

    return (
        <>
            <Content3DVisible />
        </>
    );
};

const Content3DVisible = () => {
    return <></>;
};

export default Content3D;
