import { createContext, FC, ReactNode, useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import Renderer2D from '../models/Renderer2D.ts';

export const Renderer2DContext = createContext<Renderer2D>({});

interface Slice {
    sliceColor: number;
    sliceOrientation: string;
}
export const SliceContext = createContext<Slice>({ sliceColor: 0x000000, sliceOrientation: '' });

interface Canvas2DProps {
    children?: ReactNode;
    color?: number;
    sliceOrientation: string;
    sliceColor: number;
    targetId: string;
}

const Canvas2D: FC<Canvas2DProps> = ({
    children,
    color = 0x121212,
    sliceColor,
    sliceOrientation,
    targetId,
}) => {
    const domElementRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer2D>({});

    const render = () => {
        rendererRef.current!.controls!.update();

        rendererRef.current!.gl!.clear();
        rendererRef.current!.gl!.render(rendererRef.current!.scene!, rendererRef.current!.camera!);
    };
    const animate = () => {
        render();

        requestAnimationFrame(() => void animate());
    };

    const handleResize2D = () => {
        const domElement = domElementRef.current!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const gl = rendererRef.current.gl!;
        const camera = rendererRef.current.camera!;

        gl.setSize(width, height);
    };

    useEffect(() => {
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

            const width = domElementRef.current.clientWidth;
            const height = domElementRef.current.clientHeight;

            //create camera
            const camera = new AMI.OrthographicCamera(
                width / -2,
                width / 2,
                height / 2,
                height / -2,
                1,
                10000
            );

            //create controls
            const controls = new AMI.TrackballOrthoControl(camera, domElementRef.current);
            controls.staticMoving = true;
            camera.controls = controls;

            //create scene
            const scene = new THREE.Scene();

            rendererRef.current.domElement = domElementRef.current;
            rendererRef.current.gl = gl;
            rendererRef.current.controls = controls;
            rendererRef.current.camera = camera;
            rendererRef.current.scene = scene;

            //resize camera and renderer first time
            handleResize2D();

            // Attach resize event listener
            window.addEventListener('resize', handleResize2D, false);

            //animate
            animate();
        }

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize2D);
        };
    });

    return (
        <SliceContext.Provider
            value={{ sliceColor: sliceColor, sliceOrientation: sliceOrientation }}>
            <Renderer2DContext.Provider value={rendererRef.current}>
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
            </Renderer2DContext.Provider>
        </SliceContext.Provider>
    );
};

export default Canvas2D;
