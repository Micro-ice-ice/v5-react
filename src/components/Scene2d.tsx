import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import { useEffect, useState } from 'react';

interface Scene2dProps {}

const Scene2d = (props: Scene2dProps) => {
    const { camera, gl, scene, size, setDefaultCamera } = useThree();

    //"workaround" to avoid infinity camera update
    const [initialised, setInitialised] = useState(false);

    const controls = new AMI.TrackballOrthoControl(camera, gl.domElement);
    controls.staticMoving = true;
    controls.noRotate = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.copy(camera.position);
    scene.add(light);

    console.log(camera);

    useFrame(() => controls.update());

    useEffect(() => {
        if (!initialised) {
            const newCamera = new AMI.OrthographicCamera(
                size.left / -2,
                size.right / 2,
                size.top / 2,
                size.bottom / -2,
                1,
                1000
            );

            newCamera.controls = controls;
            setInitialised(true);
            setDefaultCamera(newCamera);
        }
    });

    return <></>;
};

export default Scene2d;
