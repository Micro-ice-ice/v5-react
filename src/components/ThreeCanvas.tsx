import {OrbitControls} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

import * as THREE from 'three'


const ThreeCanvas = () => {

    const scene = useThree((state) => state.scene);
    scene.background = new THREE.Color(0x000000);
    return (
        <>
            <perspectiveCamera/>
            <OrbitControls/>
            <mesh>
                <boxGeometry/>
                <meshBasicMaterial/>
            </mesh>

        </>
    );
};

export default ThreeCanvas;