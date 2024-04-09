import { useContext, useEffect } from 'react';
import { SliceContext } from './Canvas2D.tsx';
import { RenderersContext, StackContext } from '../QuadViewProvider.tsx';
import * as THREE from 'three';
import { helpersStatusSlice } from '../../store/reducers/helpersStatus.ts';
import { visibleStatusSlice } from '../../store/reducers/visibleStatus.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import * as AMI from 'ami.js';

const StackHelper = () => {
    const { sliceColor, sliceOrientation } = useContext(SliceContext);

    const { r0, r1, r2, r3 } = useContext(RenderersContext);
    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3;

    const stack = useContext(StackContext);

    const { setStackHelpersStatus } = helpersStatusSlice.actions;
    const { setDicomVisible } = visibleStatusSlice.actions;
    const dispatch = useAppDispatch();

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
            renderer.camera!.fitBox(2);

            stackHelper.orientation = renderer.camera!.stackOrientation;
            stackHelper.index = Math.floor(stackHelper.orientationMaxIndex / 2);

            renderer.camera!.add(stackHelper);

            setDicomVisible(true);
            renderer.scene?.add(stackHelper);
            r0.scene?.add(renderer.scene!);

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
                renderer.scene.remove(renderer.stackHelper);
                renderer.stackHelper.dispose();
                r0.scene?.remove(renderer.stackHelper);

                renderer.stackHelper = undefined;
            }
        };
    });

    return (
        <>
            <StackHelperVisible />
        </>
    );
};

const StackHelperVisible = () => {
    const { sliceOrientation } = useContext(SliceContext);

    const { r0, r1, r2, r3 } = useContext(RenderersContext);
    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3;

    const { dicomVisible } = useAppSelector((state) => state.visibleStatus);

    if (renderer.stackHelper) {
        console.log(dicomVisible);
        if (dicomVisible) {
            renderer.scene?.add(renderer.stackHelper);
            r0.scene?.add(renderer.stackHelper);
        } else {
            renderer.scene?.remove(renderer.stackHelper);
            r0.scene?.remove(renderer.stackHelper);
        }
    }

    return <></>;
};

export default StackHelper;
