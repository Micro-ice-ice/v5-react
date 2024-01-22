import { useContext, useEffect, useRef } from 'react';
import { Renderer2DContext, SliceContext } from '../Canvas2D.tsx';
import { StackContext, RenderersContext } from '../QuadViewProvider.tsx';
import * as AMI from 'ami.js';
import * as THREE from 'three';
import useFrame from '../../hooks/useFrame.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { helpersStatusSlice } from '../../store/reducers/helpersStatus.ts';

const LocalizerHelper = () => {
    const { sliceColor, sliceOrientation } = useContext(SliceContext);

    const { r1, r2, r3 } = useContext(RenderersContext);
    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3;

    const stackHelpersStatus = useAppSelector((state) => state.helpersStatus.stackHelpersStatus);
    const { setLocalizerHelpersStatus } = helpersStatusSlice.actions;
    const dispatch = useAppDispatch();

    const stack = useContext(StackContext);

    const handleResizeLocalizerHelperCanvas = () => {
        const domElement = renderer.domElement!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const localizerHelper = renderer.localizerHelper!;

        localizerHelper.canvasWidth = domElement.clientWidth;
        localizerHelper.canvasHeight = domElement.clientHeight;
    };
    //
    useFrame(() => {
        if (renderer.localizerScene) {
            renderer.gl?.clearDepth();
            renderer.gl?.render(renderer.localizerScene!, renderer.camera!);
        }
    });

    useEffect(() => {
        // Init Helper Localizer
        if (stack && stackHelpersStatus) {
            const domElement = renderer.domElement!;

            const stackHelperAxial = r1.stackHelper!;
            const stackHelperSagittal = r2.stackHelper!;
            const stackHelperCoronal = r3.stackHelper!;

            if (sliceOrientation === 'axial') {
                const stackHelper = stackHelperAxial!;

                const localizerHelper = new AMI.LocalizerHelper(
                    stack,
                    stackHelper.slice.geometry,
                    stackHelper.slice.cartesianEquation()
                );

                const localizers = [
                    {
                        plane: stackHelperSagittal.slice.cartesianEquation(),
                        color: new THREE.Color(stackHelperSagittal.borderColor),
                    },
                    {
                        plane: stackHelperCoronal.slice.cartesianEquation(),
                        color: new THREE.Color(stackHelperCoronal.borderColor),
                    },
                ];

                for (let i = 0; i < localizers.length; i++) {
                    localizerHelper['plane' + (i + 1)] = localizers[i].plane;
                    localizerHelper['color' + (i + 1)] = localizers[i].color;
                }

                renderer.localizerHelper = localizerHelper;
            }
            if (sliceOrientation === 'sagittal') {
                const stackHelper = stackHelperSagittal;

                const localizerHelper = new AMI.LocalizerHelper(
                    stack,
                    stackHelper.slice.geometry,
                    stackHelper.slice.cartesianEquation()
                );

                const localizers = [
                    {
                        plane: stackHelperAxial.slice.cartesianEquation(),
                        color: new THREE.Color(stackHelperAxial.borderColor),
                    },
                    {
                        plane: stackHelperCoronal.slice.cartesianEquation(),
                        color: new THREE.Color(stackHelperCoronal.borderColor),
                    },
                ];

                for (let i = 0; i < localizers.length; i++) {
                    localizerHelper['plane' + (i + 1)] = localizers[i].plane;
                    localizerHelper['color' + (i + 1)] = localizers[i].color;
                }

                renderer.localizerHelper = localizerHelper;
            }
            if (sliceOrientation === 'coronal') {
                const stackHelper = stackHelperCoronal;

                const localizerHelper = new AMI.LocalizerHelper(
                    stack,
                    stackHelper.slice.geometry,
                    stackHelper.slice.cartesianEquation()
                );

                const localizers = [
                    {
                        plane: stackHelperAxial.slice.cartesianEquation(),
                        color: new THREE.Color(stackHelperAxial.borderColor),
                    },
                    {
                        plane: stackHelperSagittal.slice.cartesianEquation(),
                        color: new THREE.Color(stackHelperSagittal.borderColor),
                    },
                ];

                for (let i = 0; i < localizers.length; i++) {
                    localizerHelper['plane' + (i + 1)] = localizers[i].plane;
                    localizerHelper['color' + (i + 1)] = localizers[i].color;
                }

                renderer.localizerHelper = localizerHelper;
            }

            renderer.localizerHelper!.canvasWidth = domElement.clientWidth;
            renderer.localizerHelper!.canvasHeight = domElement.clientHeight;

            renderer.localizerScene = new THREE.Scene();
            renderer.localizerScene.add(renderer.localizerHelper!);

            handleResizeLocalizerHelperCanvas();

            window.addEventListener('resize', handleResizeLocalizerHelperCanvas, true);
        }

        return () => {
            window.removeEventListener('resize', handleResizeLocalizerHelperCanvas);
            //clear scene (stackHelper)
            if (renderer.scene && renderer.localizerHelper) {
                // renderer.scene.remove(...renderer.scene.children) //this clear all scene

                renderer.scene.remove(renderer.localizerHelper);
                renderer.localizerHelper.dispose();

                renderer.localizerHelper = undefined;
            }
        };
    });

    return <div></div>;
};

export default LocalizerHelper;
