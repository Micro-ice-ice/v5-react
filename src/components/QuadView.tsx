// refactor example from https://github.com/3dgraphicsplus/MedicalToolkit/tree/master/examples/viewers_quadview
import { Box } from '@mui/material';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import { useEffect, useRef } from 'react';
import Renderer3D from '../models/Renderer3D.ts';
import Renderer2D from '../models/Renderer2D.ts';

const QuadView = () => {
    const r0: Renderer3D = {};
    const r1: Renderer2D = {};
    const r2: Renderer2D = {};
    const r3: Renderer2D = {};

    const refR0 = useRef<HTMLElement>(null);
    const refR1 = useRef<HTMLElement>(null);
    const refR2 = useRef<HTMLElement>(null);
    const refR3 = useRef<HTMLElement>(null);

    const InitRenderer3D = (rendererObj: Renderer3D, element: HTMLElement, color: THREE.Color) => {
        rendererObj.domElement = element;
        rendererObj.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        rendererObj.renderer.setSize(
            rendererObj.domElement.clientWidth,
            rendererObj.domElement.clientHeight
        );
        rendererObj.color = color;
        rendererObj.renderer.setClearColor(rendererObj.color, 1);
        rendererObj.renderer.domElement.id = rendererObj.targetID as string;
        rendererObj.domElement.appendChild(rendererObj.renderer.domElement);

        // camera
        rendererObj.camera = new THREE.PerspectiveCamera(
            45,
            rendererObj.domElement.clientWidth / rendererObj.domElement.clientHeight,
            0.1,
            100000
        );
        rendererObj.camera.position.x = 250;
        rendererObj.camera.position.y = 250;
        rendererObj.camera.position.z = 250;

        // controls
        rendererObj.controls = new AMI.TrackballControl(rendererObj.camera, rendererObj.domElement);
        rendererObj.controls.rotateSpeed = 5.5;
        rendererObj.controls.zoomSpeed = 1.2;
        rendererObj.controls.panSpeed = 0.8;
        rendererObj.controls.staticMoving = true;
        rendererObj.controls.dynamicDampingFactor = 0.3;

        // scene
        rendererObj.scene = new THREE.Scene();

        // light
        rendererObj.light = new THREE.DirectionalLight(0xffffff, 1);
        rendererObj.light.position.copy(rendererObj.camera.position);
        rendererObj.scene.add(rendererObj.light);

        // stats
        // stats = new Stats();
        // renderObj.domElement.appendChild(stats.domElement);
    };

    const InitRenderer2D = (rendererObj: Renderer2D, element: HTMLElement, color: THREE.Color) => {
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

    const render = () => {
        r0!.controls!.update();
        r1!.controls!.update();
        r2!.controls!.update();
        r3!.controls!.update();

        r0!.light!.position.copy(r0.camera!.position);
        r0.renderer!.render(r0.scene!, r0!.camera!);
    };

    const animate = () => {
        render();

        // request new frame
        requestAnimationFrame(function () {
            animate();
        });
    };

    useEffect(() => {
        //init
        const colorR0 = new THREE.Color(0x212121);
        InitRenderer3D(r0, refR0.current!, colorR0);
        InitRenderer2D(r1, refR1.current!, colorR0);
        InitRenderer2D(r2, refR2.current!, colorR0);
        InitRenderer2D(r3, refR3.current!, colorR0);

        animate();
    }, []);

    //styles

    const visualizerSx = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#353535',
    };

    const rSx = {
        backgroundColor: '#000',
        width: '50%',
        maxWidth: '50%',
        height: '50%',
        boxSizing: 'border-box',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: 'none',
        position: 'relative',
        overflow: 'hidden',
    };

    return (
        <Box component="div" id="visualizer" sx={visualizerSx}>
            <Box component="div" id="r0" sx={rSx} ref={refR0}></Box>
            <Box component="div" id="r1" sx={rSx} ref={refR1}></Box>
            <Box component="div" id="r2" sx={rSx} ref={refR2}></Box>
            <Box component="div" id="r3" sx={rSx} ref={refR3}></Box>
        </Box>
    );
};

export default QuadView;
