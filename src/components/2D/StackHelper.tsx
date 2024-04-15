import { useContext, useEffect } from 'react';
import { SliceContext } from './Canvas2D.tsx';
import * as THREE from 'three';
import { helpersStatusSlice } from '../../store/reducers/helpersStatus.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import * as AMI from 'ami.js';
import useRenderers from '../../hooks/useRenderers.ts';
import useStack from '../../hooks/useStack.ts';

const StackHelper = () => {
    const { sliceColor, sliceOrientation } = useContext(SliceContext);

    const { r0, r1, r2, r3 } = useRenderers();
    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3; //определяем текущией рендерер

    const stack = useStack();

    const { setStackHelpersStatus } = helpersStatusSlice.actions;
    const dispatch = useAppDispatch();

    const { dicomVisible } = useAppSelector((state) => state.visibleStatus);

    const handleResizeStackHelperCanvas = () => {
        const domElement = renderer.domElement!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const camera = renderer.camera!;
        const stackHelper = renderer.stackHelper!;

        camera!.canvas = {
            width: width,
            height: height,
        };

        camera.fitBox(2, 1);

        stackHelper.slice.canvasWidth = domElement.clientWidth;
        stackHelper.slice.canvasHeight = domElement.clientHeight;
    };

    const stackHelpersStatusUpdate = () => {
        if (r1.stackHelper && r2.stackHelper && r3.stackHelper) {
            dispatch(setStackHelpersStatus(true));
        }
    };

    useEffect(() => {
        //Init Helper Stack

        if (stack) {
            const AmiStackHelper = AMI.stackHelperFactory(THREE);
            const stackHelper: AMI.StackHelper = new AmiStackHelper(stack);
            renderer.stackHelper = stackHelper;

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

            stackHelpersStatusUpdate();

            handleResizeStackHelperCanvas();

            window.addEventListener('resize', handleResizeStackHelperCanvas, true);
        }

        return () => {
            window.removeEventListener('resize', handleResizeStackHelperCanvas);
            //clear scene (stackHelper)

            if (renderer.scene && renderer.stackHelper) {
                // renderer.scene.remove(...renderer.scene.children) //this clear all scene

                renderer.camera!.remove(renderer.stackHelper);
                renderer.scene!.remove(renderer.stackHelper);
                r0.scene!.remove(renderer.scene!);

                renderer.stackHelper.dispose();
                renderer.stackHelper = undefined;
            }
        };
    }, [stack]);

    //состояние видимости
    useEffect(() => {
        if (renderer.isInit && renderer.stackHelper) {
            renderer.camera!.remove(renderer.stackHelper);
            renderer.scene!.remove(renderer.stackHelper);
            r0.scene!.remove(renderer.scene!);

            if (dicomVisible) {
                renderer.camera!.add(renderer.stackHelper);

                renderer.scene?.add(renderer.stackHelper);
                r0.scene?.add(renderer.scene!);
            }
        }
    });

    return <></>;
};

export default StackHelper;
