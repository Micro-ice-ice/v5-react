import { useContext, useEffect } from 'react';
import { SliceContext } from './Canvas2D.tsx';
import * as THREE from 'three';
import { localizerHelperFactory, LocalizerHelper as AmiLocalizerHelper } from 'ami.js';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { helpersStatusSlice } from '../../store/reducers/helpersStatus.ts';
import useRenderers from '../../hooks/useRenderers.ts';
import useStack from '../../hooks/useStack.ts';
import renderer2D from '../../helpers/Renderer2D.ts';

const LocalizerHelper = () => {
    const { sliceOrientation } = useContext(SliceContext);

    const { r0, r1, r2, r3 } = useRenderers();
    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3;

    const stackHelpersStatus = useAppSelector((state) => state.helpersStatus.stackHelpersStatus);
    const { setLocalizerHelpersStatus } = helpersStatusSlice.actions;
    const dispatch = useAppDispatch();

    const stack = useStack();

    const handleResize = () => {
        const domElement = renderer.domElement!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const localizerHelper = renderer.localizerHelper!;

        localizerHelper.canvasWidth = width;
        localizerHelper.canvasHeight = height;
    };

    const stackHelpersStatusUpdate = () => {
        if (r1.localizerHelper && r2.localizerHelper && r3.localizerHelper) {
            dispatch(setLocalizerHelpersStatus(true));
        }
    };

    useEffect(() => {
        // Init Helper Localizer
        if (stack && stackHelpersStatus) {
            const domElement = renderer.domElement!;

            const stackHelperAxial = r1.stackHelper!;
            const stackHelperSagittal = r2.stackHelper!;
            const stackHelperCoronal = r3.stackHelper!;

            const AmiLocalizerHelper = localizerHelperFactory(THREE);

            if (sliceOrientation === 'axial') {
                const stackHelper = stackHelperAxial!;

                const localizerHelper = new AmiLocalizerHelper(
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

                const localizerHelper = new AmiLocalizerHelper(
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

                const localizerHelper = new AmiLocalizerHelper(
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

            renderer.scene?.add(renderer.localizerHelper!);

            stackHelpersStatusUpdate();

            handleResize();

            window.addEventListener('resize', handleResize, true);
        }

        return () => {
            if (renderer.scene && renderer.localizerHelper) {
                // renderer.scene.remove(...renderer.scene.children) //this clear all scene

                renderer.scene.remove(renderer.localizerHelper);
                renderer.localizerHelper.dispose();

                renderer.localizerHelper = undefined;

                window.removeEventListener('resize', handleResize);
            }
        };
    }, [stack, stackHelpersStatus]);

    useEffect(() => {
        if (renderer.isInit && renderer.localizerHelper) {
            renderer.camera!.remove(renderer.localizerHelper);
            renderer.scene!.remove(renderer.localizerHelper);
            r0.scene!.remove(renderer.scene!);

            if (dicomVisible) {
                renderer.camera!.add(renderer.localizerHelper);

                renderer.scene?.add(renderer.localizerHelper);
                r0.scene?.add(renderer.scene!);
            }
        }
    });

    const updateLocalizer = (
        renderer: renderer2D,
        targetLocalizersHelpers: AmiLocalizerHelper[]
    ) => {
        const stackHelper = renderer.stackHelper!;
        const localizerHelper = renderer.localizerHelper!;
        const plane = stackHelper.slice.cartesianEquation();
        localizerHelper.referencePlane = plane;

        // bit of a hack... works fine for this application
        for (let i = 0; i < targetLocalizersHelpers.length; i++) {
            for (let j = 0; j < 3; j++) {
                const targetPlane = targetLocalizersHelpers[i]['plane' + (j + 1)];
                if (
                    targetPlane &&
                    plane.x.toFixed(6) === targetPlane.x.toFixed(6) &&
                    plane.y.toFixed(6) === targetPlane.y.toFixed(6) &&
                    plane.z.toFixed(6) === targetPlane.z.toFixed(6)
                ) {
                    targetLocalizersHelpers[i]['plane' + (j + 1)] = plane;
                }
            }
        }

        // update the geometry will create a new mesh
        localizerHelper.geometry = stackHelper.slice.geometry;
    };

    const { dicomVisible } = useAppSelector((state) => state.visibleStatus);

    useEffect(() => {
        if (renderer.localizerHelper) {
            renderer.localizerHelper.visible = dicomVisible;
        }
    }, [dicomVisible, renderer.localizerHelper]);

    return <></>;
};

export default LocalizerHelper;
