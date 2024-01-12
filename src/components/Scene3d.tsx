import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import { useEffect } from 'react';

interface Scene3dProps {}

const Scene3d = (props: Scene3dProps) => {
    const { camera, gl, scene } = useThree();

    camera.position.x = 250;
    camera.position.y = 250;
    camera.position.z = 250;

    const controls = new AMI.TrackballControl(camera, gl.domElement);
    controls.rotateSpeed = 10.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.copy(camera.position);
    scene.add(light);

    useFrame(() => controls.update());

    // useEffect(() => {
    //     //camera
    //     // const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    //     // camera.position.x = 250;
    //     // camera.position.y = 250;
    //     // camera.position.z = 250;
    //     // setDefaultCamera(camera);
    //     // // controls
    //
    //     //
    //     // const light = new THREE.DirectionalLight(0xffffff, 1);
    //     // light.position.copy(camera.position);
    //     // scene.add(light);
    // });

    return <></>;
};

export default Scene3d;
