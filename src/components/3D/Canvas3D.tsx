import { FC, ReactNode, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { trackballControlFactory } from 'ami.js';
import useFrame from '../../hooks/useFrame.ts';
import { RenderersContext } from '../QuadViewProvider.tsx';

interface Canvas3DProps {
    children?: ReactNode;
    color?: number;
    targetId: string;
}

const Canvas3D: FC<Canvas3DProps> = ({ children, color = 0x212121, targetId }) => {
    const domElementRef = useRef<HTMLDivElement>(null);
    const { r0 } = useContext(RenderersContext);
    const renderer = r0;

    useFrame(() => {
        renderer.controls!.update();

        renderer.light!.position.copy(renderer.camera!.position);
        renderer.gl!.render(renderer.scene!, renderer.camera!);
    });

    const handleResize = () => {
        const width = domElementRef.current!.clientWidth;
        const height = domElementRef.current!.clientHeight;
        const gl = renderer.gl!;
        const camera = renderer.camera!;

        gl.setSize(width, height);
        // Update camera aspect ratio
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    useEffect(() => {
        // Initialize on mount
        if (domElementRef.current) {
            //create gl
            const gl = new THREE.WebGLRenderer({
                antialias: true,
            });
            gl.autoClear = false;
            gl.localClippingEnabled = true;
            gl.setClearColor(color, 1);
            gl.domElement.id = targetId;
            domElementRef.current.appendChild(gl.domElement);

            //create camera
            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
            camera.position.x = 250;
            camera.position.y = 250;
            camera.position.z = 250;

            //create controls
            const AmiTrackballControl = trackballControlFactory(THREE);
            const controls = new AmiTrackballControl(camera, domElementRef.current);
            controls.rotateSpeed = 10.5;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;

            //create scene
            const scene = new THREE.Scene();
            // scene.add(new THREE.Mesh(new BoxGeometry(), new MeshLambertMaterial()));

            const clipScene = new THREE.Scene();

            const light = new THREE.DirectionalLight(0xffffff, 1);
            scene.add(light);

            //add refs
            renderer.gl = gl;
            renderer.camera = camera;
            renderer.controls = controls;
            renderer.scene = scene;
            renderer.light = light;
            renderer.clipScene = clipScene;

            //resize camera and renderer first time
            handleResize();

            // Attach resize event listener
            window.addEventListener('resize', handleResize, true);
        }

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <div
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
            }}
            ref={domElementRef}>
            {children}
        </div>
    );
};

export default Canvas3D;
