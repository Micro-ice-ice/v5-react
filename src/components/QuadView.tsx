// refactor example from https://github.com/3dgraphicsplus/MedicalToolkit/tree/master/examples/viewers_quadview
import { Box } from '@mui/material';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import { useEffect, useRef, useState } from 'react';
import RendererObj3D from '../models/RendererObj3D.ts';
import RendererObj2D from '../models/RendererObj2D.ts';
import { Vector4 } from 'three';
import { useAppSelector } from '../hooks/redux.ts';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db.ts';
import DICOMLoader from '../helpers/DICOM/DICOMLoader.ts';
import { Canvas } from '@react-three/fiber';
import Scene3d from './Scene3d.tsx';
import Scene2d from './Scene2d.tsx';

// const r0: RendererObj3D = {};
// const r1: RendererObj2D = {
//     color: 0x121212,
//     sliceOrientation: 'axial',
//     sliceColor: 0xff1744,
//     targetID: 1,
// };
// const r2: RendererObj2D = {
//     color: 0x121212,
//     sliceOrientation: 'sagittal',
//     sliceColor: 0xffea00,
//     targetID: 2,
// };
// const r3: RendererObj2D = {
//     color: 0x121212,
//     sliceOrientation: 'coronal',
//     sliceColor: 0x76ff03,
//     targetID: 3,
// };
//
// const sceneClip = new THREE.Scene();
// const clipPlane1 = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
// const clipPlane2 = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
// const clipPlane3 = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);

const QuadView = () => {
    // const currentPatient = useAppSelector((state) => state.currentPatient.patient);
    // const currentPatientData = useLiveQuery(() => {
    //     return db.patientsData
    //         .where('id')
    //         .equals(currentPatient ? currentPatient.id : '')
    //         .first();
    // }, [currentPatient]);
    //
    // // const [r0, setR0] = useState<Renderer3D>({});
    //
    // const refR0 = useRef<HTMLElement>(null);
    // const refR1 = useRef<HTMLElement>(null);
    // const refR2 = useRef<HTMLElement>(null);
    // const refR3 = useRef<HTMLElement>(null);
    //
    // const InitRenderer3D = (
    //     rendererObj: RendererObj3D,
    //     element: HTMLElement,
    //     color: THREE.Color
    // ) => {
    //     rendererObj.domElement = element;
    //     rendererObj.renderer = new THREE.WebGLRenderer({
    //         antialias: true,
    //     });
    //     rendererObj.renderer.setSize(
    //         rendererObj.domElement.clientWidth,
    //         rendererObj.domElement.clientHeight
    //     );
    //     rendererObj.color = color;
    //     rendererObj.renderer.setClearColor(rendererObj.color, 1);
    //     rendererObj.renderer.domElement.id = rendererObj.targetID as string;
    //     rendererObj.domElement.appendChild(rendererObj.renderer.domElement);
    //
    //     // camera
    //     rendererObj.camera = new THREE.PerspectiveCamera(
    //         45,
    //         rendererObj.domElement.clientWidth / rendererObj.domElement.clientHeight,
    //         0.1,
    //         100000
    //     );
    //     rendererObj.camera.position.x = 250;
    //     rendererObj.camera.position.y = 250;
    //     rendererObj.camera.position.z = 250;
    //
    //     // controls
    //     rendererObj.controls = new AMI.TrackballControl(rendererObj.camera, rendererObj.domElement);
    //     rendererObj.controls.rotateSpeed = 10.5;
    //     rendererObj.controls.zoomSpeed = 1.2;
    //     rendererObj.controls.panSpeed = 0.8;
    //     rendererObj.controls.staticMoving = true;
    //     rendererObj.controls.dynamicDampingFactor = 0.3;
    //
    //     // scene
    //     rendererObj.scene = new THREE.Scene();
    //
    //     // light
    //     rendererObj.light = new THREE.DirectionalLight(0xffffff, 1);
    //     rendererObj.light.position.copy(rendererObj.camera.position);
    //     rendererObj.scene.add(rendererObj.light);
    //
    //     // stats
    //     // stats = new Stats();
    //     // renderObj.domElement.appendChild(stats.domElement);
    // };
    //
    const InitRenderer2D = (
        rendererObj: RendererObj2D,
        element: HTMLElement,
        color: THREE.Color
    ) => {
        rendererObj.domElement = element;
        rendererObj.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        rendererObj.renderer.autoClear = false;
        rendererObj.renderer.localClippingEnabled = true;
        rendererObj.renderer.setSize(
            rendererObj.domElement.clientWidth,
            rendererObj.domElement.clientHeight
        );
        rendererObj.renderer.setClearColor(0x121212, 1);
        rendererObj.renderer.domElement.id = rendererObj.targetID as string;
        rendererObj.domElement.appendChild(rendererObj.renderer.domElement);

        // camera
        rendererObj.camera = new AMI.OrthographicCamera(
            rendererObj.domElement.clientWidth / -2,
            rendererObj.domElement.clientWidth / 2,
            rendererObj.domElement.clientHeight / 2,
            rendererObj.domElement.clientHeight / -2,
            1,
            1000
        );

        // controls
        rendererObj.controls = new AMI.TrackballOrthoControl(
            rendererObj.camera,
            rendererObj.domElement
        );
        rendererObj.controls.staticMoving = true;
        rendererObj.controls.noRotate = true;
        rendererObj.camera.controls = rendererObj.controls;

        // scene
        rendererObj.scene = new THREE.Scene();
    };

    // const InitHelpersStack = (rendererObj: RendererObj2D, stack: AMI.Stack) => {
    //     rendererObj.stackHelper = new AMI.StackHelper(stack);
    //
    //     rendererObj.stackHelper.bbox.visible = false;
    //     rendererObj.stackHelper.borderColor = rendererObj.sliceColor!;
    //     rendererObj.stackHelper.slice.canvasWidth = rendererObj.domElement!.clientWidth;
    //     rendererObj.stackHelper.slice.canvasHeight = rendererObj.domElement!.clientHeight;
    //
    //     const worldbb = stack.worldBoundingBox();
    //     const lpsDims = new THREE.Vector3(
    //         (worldbb[1] - worldbb[0]) / 2,
    //         (worldbb[3] - worldbb[2]) / 2,
    //         (worldbb[5] - worldbb[4]) / 2
    //     );
    //
    //     const box = {
    //         center: stack.worldCenter().clone(),
    //         halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 10, lpsDims.z + 10),
    //     };
    //
    //     // init and zoom
    //     const canvas = {
    //         width: rendererObj.domElement!.clientWidth,
    //         height: rendererObj.domElement!.clientHeight,
    //     };
    //
    //     rendererObj.camera!.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    //     rendererObj.camera!.box = box;
    //     rendererObj.camera!.canvas = canvas;
    //     rendererObj.camera!.orientation = rendererObj.sliceOrientation!;
    //     rendererObj.camera!.update();
    //     rendererObj.camera!.fitBox(2, 1);
    //
    //     rendererObj.stackHelper.orientation = rendererObj.camera!.stackOrientation;
    //     rendererObj.stackHelper.index = Math.floor(rendererObj.stackHelper.orientationMaxIndex / 2);
    //     rendererObj.scene!.add(rendererObj.stackHelper);
    // };
    //
    // const InitHelpersLocalizer = (
    //     rendererObj: RendererObj2D,
    //     stack: AMI.Stack,
    //     referencePlane: Vector4,
    //     localizers: { plane: Vector4; color: THREE.Color }[]
    // ) => {
    //     rendererObj.localizerHelper = new AMI.LocalizerHelper(
    //         stack,
    //         rendererObj.stackHelper!.slice.geometry,
    //         referencePlane
    //     );
    //
    //     for (let i = 0; i < localizers.length; i++) {
    //         rendererObj.localizerHelper['plane' + (i + 1)] = localizers[i].plane;
    //         rendererObj.localizerHelper['color' + (i + 1)] = localizers[i].color;
    //     }
    //
    //     rendererObj.localizerHelper.canvasWidth = rendererObj.domElement!.clientWidth;
    //     rendererObj.localizerHelper.canvasHeight = rendererObj.domElement!.clientHeight;
    //
    //     rendererObj.localizerScene = new THREE.Scene();
    //     rendererObj.localizerScene.add(rendererObj.localizerHelper);
    // };
    //
    // const render = () => {
    //     r0!.controls!.update();
    //     r1!.controls!.update();
    //     r2!.controls!.update();
    //     r3!.controls!.update();
    //
    //     r0.light!.position.copy(r0.camera!.position);
    //     r0.renderer!.render(r0.scene!, r0.camera!);
    //
    //     // r1
    //     r1.renderer!.clear();
    //     r1.renderer!.render(r1.scene!, r1.camera!);
    //     // // mesh
    //     // r1.renderer!.clearDepth();
    //     //
    //     // // localizer
    //     // r1.renderer!.clearDepth();
    //     // r1.renderer!.render(r1.localizerScene, r1.camera!);
    //     //
    //     // // r2
    //     r2.renderer!.clear();
    //     r2.renderer!.render(r2.scene!, r2.camera!);
    //     // // mesh
    //     // r2.renderer!.clearDepth();
    //     // r2.renderer!.render(sceneClip, r2.camera!);
    //     // // localizer
    //     // r2.renderer!.clearDepth();
    //     // r2.renderer!.render(r2.localizerScene, r2.camera!);
    //     //
    //     // // r3
    //     r3.renderer!.clear();
    //     r3.renderer!.render(r3.scene!, r3.camera!);
    //     // // mesh
    //     // r3.renderer!.clearDepth();
    //     // r3.renderer!.render(sceneClip, r3.camera!);
    //     // // localizer
    //     // r3.renderer!.clearDepth();
    //     // r3.renderer!.render(r3.localizerScene, r3.camera!);
    // };
    //
    // const animate = () => {
    //     render();
    //
    //     // request new frame
    //     requestAnimationFrame(function () {
    //         animate();
    //     });
    // };
    //
    // //init
    // useEffect(() => {
    //     const colorR0 = new THREE.Color(0x212121);
    //     InitRenderer3D(r0, refR0.current!, colorR0);
    //     InitRenderer2D(r1, refR1.current!, colorR0);
    //     InitRenderer2D(r2, refR2.current!, colorR0);
    //     InitRenderer2D(r3, refR3.current!, colorR0);
    //
    //     animate();
    //
    //     //load
    // }, []);
    //
    // useEffect(() => {
    //     console.log(AMI);
    //     if (currentPatient && currentPatientData) {
    //         const files = currentPatientData.files;
    //
    //         DICOMLoader.loadSeries(files)
    //             .then((series) => {
    //                 const stack = series.stack[0];
    //                 stack.prepare();
    //                 // center 3d camera/control on the stack
    //                 const centerLPS = stack.worldCenter();
    //                 r0.camera!.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
    //                 r0.camera!.updateMatrix();
    //                 r0.controls!.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
    //
    //                 // bounding box
    //                 const boxHelper = new AMI.BoundingBoxHelper(stack);
    //                 r0.scene!.add(boxHelper);
    //
    //                 InitHelpersStack(r1, stack);
    //                 r0.scene!.add(r1.scene!);
    //
    //                 InitHelpersStack(r2, stack);
    //                 r0.scene!.add(r2.scene!);
    //
    //                 InitHelpersStack(r3, stack);
    //                 r0.scene!.add(r3.scene!);
    //
    //                 const plane1 = r1.stackHelper!.slice.cartesianEquation();
    //                 const plane2 = r2.stackHelper!.slice.cartesianEquation();
    //                 const plane3 = r3.stackHelper!.slice.cartesianEquation();
    //
    //                 // localizer red slice
    //                 InitHelpersLocalizer(r1, stack, plane1, [
    //                     { plane: plane2, color: new THREE.Color(r2.stackHelper!.borderColor) },
    //                     { plane: plane3, color: new THREE.Color(r3.stackHelper!.borderColor) },
    //                 ]);
    //
    //                 // localizer yellow slice
    //                 InitHelpersLocalizer(r2, stack, plane2, [
    //                     { plane: plane1, color: new THREE.Color(r1.stackHelper!.borderColor) },
    //                     { plane: plane3, color: new THREE.Color(r3.stackHelper!.borderColor) },
    //                 ]);
    //
    //                 // localizer green slice
    //                 InitHelpersLocalizer(r3, stack, plane3, [
    //                     { plane: plane1, color: new THREE.Color(r1.stackHelper!.borderColor) },
    //                     { plane: plane2, color: new THREE.Color(r2.stackHelper!.borderColor) },
    //                 ]);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }
    // }, [currentPatientData]);
    //
    // //styles
    //
    // const visualizerSx = {
    //     width: '100%',
    //     height: '100%',
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     backgroundColor: '#353535',
    // };
    //
    // const rSx = {
    //     backgroundColor: '#000',
    //     width: '50%',
    //     maxWidth: '50%',
    //     height: '50%',
    //     boxSizing: 'border-box',
    //     border: '1px solid rgba(255, 255, 255, 0.2)',
    //     borderBottom: 'none',
    //     position: 'relative',
    //     overflow: 'hidden',
    // };

    // return (
    //     <Box component="div" id="visualizer" sx={visualizerSx}>
    //         <Box component="div" id="r0" sx={rSx} ref={refR0}></Box>
    //         <Box component="div" id="r1" sx={rSx} ref={refR1}></Box>
    //         <Box component="div" id="r2" sx={rSx} ref={refR2}></Box>
    //         <Box component="div" id="r3" sx={rSx} ref={refR3}></Box>,
    //     </Box>
    // );

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                backgroundColor: '#353535',
            }}>
            <Canvas
                style={{
                    backgroundColor: '#000',
                    width: '50%',
                    maxWidth: '50%',
                    height: '50%',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderBottom: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                <mesh>
                    <boxGeometry />
                    <meshBasicMaterial />
                </mesh>
                <Scene3d></Scene3d>
            </Canvas>
            <Canvas
                style={{
                    backgroundColor: '#000',
                    width: '50%',
                    maxWidth: '50%',
                    height: '50%',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderBottom: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                <mesh>
                    <boxGeometry />
                    <meshBasicMaterial />
                </mesh>
                <Scene2d></Scene2d>
            </Canvas>
            <Canvas
                style={{
                    backgroundColor: '#000',
                    width: '50%',
                    maxWidth: '50%',
                    height: '50%',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderBottom: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                <mesh>
                    <boxGeometry />
                    <meshBasicMaterial />
                </mesh>
                {/*<Scene2d></Scene2d>*/}
            </Canvas>
            <Canvas
                style={{
                    backgroundColor: '#000',
                    width: '50%',
                    maxWidth: '50%',
                    height: '50%',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderBottom: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                <mesh>
                    <boxGeometry />
                    <meshBasicMaterial />
                </mesh>
                {/*<Scene2d></Scene2d>*/}
            </Canvas>
        </div>
    );
};

export default QuadView;
