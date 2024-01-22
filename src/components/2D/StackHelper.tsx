import { useContext, useEffect, useRef } from 'react';
import { Renderer2DContext, SliceContext } from '../Canvas2D.tsx';
import { StackContext, StackHelpersContext } from '../QuadViewProvider.tsx';
import * as AMI from 'ami.js';
import * as THREE from 'three';

const StackHelper = () => {
    const renderer = useContext(Renderer2DContext);
    const { sliceColor, sliceOrientation } = useContext(SliceContext);
    const stack = useContext(StackContext);

    const stackHelpers = useContext(StackHelpersContext);
    console.log('update cause State change');

    const handleResizeStackHelperCanvas = () => {
        const domElement = renderer.domElement!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const camera = renderer.camera!;
        const stackHelper = stackHelperRef.current!;

        camera!.canvas = {
            width: width,
            height: height,
        };

        camera.fitBox(2, 1);

        stackHelper.slice.canvasWidth = domElement.clientWidth;
        stackHelper.slice.canvasHeight = domElement.clientHeight;
    };

    useEffect(() => {
        //Init Helper Stack
        if (stack) {
            const stackHelper = new AMI.StackHelper(stack);
            stackHelperRef.current = stackHelper;

            stackHelper.bbox.visible = false;
            stackHelper.borderColor = sliceColor;
            stackHelper.slice.canvasWidth = renderer.gl!.domElement.width;
            stackHelper.slice.canvasHeight = renderer.gl!.domElement.height;

            const worldbb = stack.worldBoundingBox();
            const lpsDims = new THREE.Vector3(
                (worldbb[1] - worldbb[0]) / 2,
                (worldbb[3] - worldbb[2]) / 2,
                (worldbb[5] - worldbb[4]) / 2
            );

            const box = {
                center: stack.worldCenter().clone(),
                halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10),
            };

            renderer.camera!.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
            renderer.camera!.box = box;
            renderer.camera!.orientation = sliceOrientation;
            renderer.camera!.update();
            renderer.camera!.fitBox(2, 1);

            stackHelper.orientation = renderer.camera!.stackOrientation;
            stackHelper.index = Math.floor(stackHelper.orientationMaxIndex / 2);
            renderer.camera!.add(stackHelper);

            renderer.scene?.add(stackHelper);

            handleResizeStackHelperCanvas();

            window.addEventListener('resize', handleResizeStackHelperCanvas, true);
        }

        return () => {
            window.removeEventListener('resize', handleResizeStackHelperCanvas);
            //clear scene (stackHelper)
            if (renderer.scene && stackHelperRef.current) {
                // renderer.scene.remove(...renderer.scene.children) //this clear all scene

                renderer.scene.remove(stackHelperRef.current);
                stackHelperRef.current.dispose();
            }
        };
    });

    return <div></div>;
};

export default StackHelper;
