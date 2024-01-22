import { useContext, useEffect, useRef } from 'react';
import { Renderer2DContext, SliceContext } from '../Canvas2D.tsx';
import { StackContext, StackHelpersContext } from '../QuadViewProvider.tsx';
import * as AMI from 'ami.js';
import * as THREE from 'three';
import useFrame from '../../hooks/useFrame.ts';

const LocalizerHelper = () => {
    const renderer = useContext(Renderer2DContext);
    const { sliceColor, sliceOrientation } = useContext(SliceContext);
    const stack = useContext(StackContext);

    const localizerHelperRef = useRef<AMI.LocalizerHelper | null>(null);

    const { stackHelperCoronal, stackHelperSagittal, stackHelperAxial } =
        useContext(StackHelpersContext);

    const localizerSceneRef = useRef<THREE.Scene>(new THREE.Scene());

    const handleResizeLocalizerHelperCanvas = () => {
        const domElement = renderer.domElement!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const localizerHelper = localizerHelperRef.current!;

        localizerHelper.canvasWidth = domElement.clientWidth;
        localizerHelper.canvasHeight = domElement.clientHeight;
    };

    useFrame(() => {
        renderer.gl?.clearDepth();
        renderer.gl?.render(localizerSceneRef.current, renderer.camera!);
    });

    useEffect(() => {
        //Init Helper Localizer

        console.log(stackHelperAxial);
        console.log(stackHelperSagittal);
        console.log(stackHelperCoronal);

        if (stack && stackHelperAxial && stackHelperSagittal && stackHelperCoronal) {
            const domElement = renderer.domElement!;

            if (sliceOrientation === 'axial') {
                const stackHelper = stackHelperAxial;

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

                localizerHelper.canvasWidth = domElement.clientWidth;
                localizerHelper.canvasHeight = domElement.clientHeight;

                localizerSceneRef.current.add(localizerHelper);
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

                localizerHelper.canvasWidth = domElement.clientWidth;
                localizerHelper.canvasHeight = domElement.clientHeight;

                localizerSceneRef.current.add(localizerHelper);
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

                localizerHelper.canvasWidth = domElement.clientWidth;
                localizerHelper.canvasHeight = domElement.clientHeight;

                localizerSceneRef.current.add(localizerHelper);
            }

            handleResizeLocalizerHelperCanvas();

            window.addEventListener('resize', handleResizeLocalizerHelperCanvas, true);
        }

        return () => {
            window.removeEventListener('resize', handleResizeLocalizerHelperCanvas);
            //clear scene (stackHelper)
            // if (renderer.scene && stackHelperRef.current) {
            //     // renderer.scene.remove(...renderer.scene.children) //this clear all scene
            //
            //     renderer.scene.remove(stackHelperRef.current);
            //     stackHelperRef.current?.dispose();
            // }
        };
    });

    return <div></div>;
};

export default LocalizerHelper;
