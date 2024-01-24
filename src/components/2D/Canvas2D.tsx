import { createContext, FC, ReactNode, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as AMI from 'ami.js';
import useFrame from '../../hooks/useFrame.ts';
import { RenderersContext } from '../QuadViewProvider.tsx';
import renderer2D from '../../models/Renderer2D.ts';

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
    const { r0, r1, r2, r3 } = useContext(RenderersContext);
    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3;

    const handleResize = () => {
        const domElement = domElementRef.current!;
        const width = domElement.clientWidth;
        const height = domElement.clientHeight;
        const gl = renderer.gl!;
        // const camera = renderer.camera!;

        gl.setSize(width, height);
    };

    const updateLocalizer = (
        renderer: renderer2D,
        targetLocalizersHelpers: AMI.LocalizerHelper[]
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

    // const updateClipPlane = (renderer: Renderer2D, clipPlane: THREE.Plane) => {
    //     const stackHelper = renderer.stackHelper!;
    //     const camera = renderer.camera!;
    //     const vertices = stackHelper.slice.geometry.attributes.position.array;
    //     const p1 = new THREE.Vector3(vertices[0], vertices[1], vertices[2]).applyMatrix4(
    //         stackHelper.stack.ijk2LPS
    //     );
    //     const p2 = new THREE.Vector3(vertices[3], vertices[4], vertices[5]).applyMatrix4(
    //         stackHelper.stack.ijk2LPS
    //     );
    //     const p3 = new THREE.Vector3(vertices[6], vertices[7], vertices[8]).applyMatrix4(
    //         stackHelper.stack.ijk2LPS
    //     );
    //
    //     clipPlane.setFromCoplanarPoints(p1, p2, p3);
    //
    //     const cameraDirection = new THREE.Vector3(1, 1, 1);
    //     cameraDirection.applyQuaternion(camera.quaternion);
    //
    //     if (cameraDirection.dot(clipPlane.normal) > 0) {
    //         clipPlane.negate();
    //     }
    // };

    const onDoubleClick = (event: MouseEvent) => {
        const canvas = renderer.domElement!;

        const mouse = {
            x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
            y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
        };

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, renderer.camera!);

        const intersects = raycaster.intersectObjects(renderer.scene!.children, true);

        if (intersects.length > 0) {
            console.log(AMI);
            const ijk = AMI.UtilsCore.worldToData(
                renderer.stackHelper!.stack.lps2IJK,
                intersects[0].point
            );

            r1.stackHelper!.index = ijk.getComponent((r1.stackHelper!.orientation + 2) % 3);
            r2.stackHelper!.index = ijk.getComponent((r2.stackHelper!.orientation + 2) % 3);
            r3.stackHelper!.index = ijk.getComponent((r3.stackHelper!.orientation + 2) % 3);

            updateLocalizer(r3, [r1.localizerHelper!, r2.localizerHelper!]);
            //updateClipPlane(r3, r3.plane!);

            updateLocalizer(r1, [r2.localizerHelper!, r3.localizerHelper!]);
            //updateClipPlane(r1, r1.plane!);

            updateLocalizer(r2, [r1.localizerHelper!, r3.localizerHelper!]);
            //updateClipPlane(r2, r2.plane!);
        }
    };

    useFrame(() => {
        renderer.controls?.update();

        renderer.gl?.clear();
        renderer.gl?.render(renderer.scene!, renderer.camera!);

        renderer.gl?.clearDepth();
        renderer.gl?.render(r0.clipScene!, r2.camera!);
    });

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
                1000
            );

            //create controls
            const controls = new AMI.TrackballOrthoControl(camera, domElementRef.current);
            controls.staticMoving = true;
            camera.controls = controls;

            //create scene
            const scene = new THREE.Scene();

            //clip plane
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);

            renderer.domElement = domElementRef.current;
            renderer.gl = gl;
            renderer.controls = controls;
            renderer.camera = camera;
            renderer.scene = scene;
            renderer.plane = plane;

            //resize camera and renderer first time
            handleResize();

            // Attach resize event listener
            window.addEventListener('resize', handleResize, false);
            renderer.domElement.addEventListener('dblclick', onDoubleClick);
        }

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <SliceContext.Provider
            value={{ sliceColor: sliceColor, sliceOrientation: sliceOrientation }}>
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
        </SliceContext.Provider>
    );
};

export default Canvas2D;
