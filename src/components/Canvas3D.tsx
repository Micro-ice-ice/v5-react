import { createContext, FC, ReactNode, useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import Renderer3D from '../models/Renderer3D.ts';
import useFrame from '../hooks/useFrame.ts';

export const Renderer3DContext = createContext<Renderer3D>({});

interface Canvas3DProps {
    children?: ReactNode;
    color?: number;
    targetId: string;
}

const Canvas3D: FC<Canvas3DProps> = ({ children, color = 0x212121, targetId }) => {
    const domElementRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer3D>({});

    useFrame(() => {
        rendererRef.current.controls!.update();

        rendererRef.current.light!.position.copy(rendererRef.current.camera!.position);
        rendererRef.current.gl!.render(rendererRef.current.scene!, rendererRef.current.camera!);
    });

    const handleResize = () => {
        const width = domElementRef.current!.clientWidth;
        const height = domElementRef.current!.clientHeight;
        const gl = rendererRef.current.gl!;
        const camera = rendererRef.current.camera!;

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
            const controls = new AMI.TrackballControl(camera, domElementRef.current);
            controls.rotateSpeed = 10.5;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;

            //create scene
            const scene = new THREE.Scene();
            // scene.add(new THREE.Mesh(new BoxGeometry(), new MeshBasicMaterial()));

            const light = new THREE.DirectionalLight(0xffffff, 1);
            scene.add(light);

            //add refs
            rendererRef.current.gl = gl;
            rendererRef.current.camera = camera;
            rendererRef.current.controls = controls;
            rendererRef.current.scene = scene;
            rendererRef.current.light = light;

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
        <Renderer3DContext.Provider value={rendererRef.current}>
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
        </Renderer3DContext.Provider>
    );
};

export default Canvas3D;
