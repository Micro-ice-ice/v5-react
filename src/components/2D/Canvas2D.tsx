import { createContext, FC, ReactNode, useEffect, useRef } from 'react';

import { LocalizerHelper } from 'ami.js';
import useFrame from '../../hooks/useFrame.ts';
import useRenderers from '../../hooks/useRenderers.ts';

interface Slice {
    sliceColor: number;
    sliceOrientation: 'axial' | 'sagittal' | 'coronal' | '';
}
export const SliceContext = createContext<Slice>({ sliceColor: 0x000000, sliceOrientation: '' });

interface Canvas2DProps extends Slice {
    children?: ReactNode;
    color?: number;
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
    const { r1, r2, r3 } = useRenderers();

    const renderer = sliceOrientation === 'axial' ? r1 : sliceOrientation === 'sagittal' ? r2 : r3;

    // const updateLocalizer = (renderer: renderer2D, targetLocalizersHelpers: LocalizerHelper[]) => {
    //     const stackHelper = renderer.stackHelper!;
    //     const localizerHelper = renderer.localizerHelper!;
    //     const plane = stackHelper.slice.cartesianEquation();
    //     localizerHelper.referencePlane = plane;
    //
    //     // bit of a hack... works fine for this application
    //     for (let i = 0; i < targetLocalizersHelpers.length; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             const targetPlane = targetLocalizersHelpers[i]['plane' + (j + 1)];
    //             if (
    //                 targetPlane &&
    //                 plane.x.toFixed(6) === targetPlane.x.toFixed(6) &&
    //                 plane.y.toFixed(6) === targetPlane.y.toFixed(6) &&
    //                 plane.z.toFixed(6) === targetPlane.z.toFixed(6)
    //             ) {
    //                 targetLocalizersHelpers[i]['plane' + (j + 1)] = plane;
    //             }
    //         }
    //     }
    //
    //     // update the geometry will create a new mesh
    //     localizerHelper.geometry = stackHelper.slice.geometry;
    // };

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

    // const onDoubleClick = (event: MouseEvent) => {
    //     const canvas = renderer.domElement!;
    //
    //     const mouse = {
    //         x: ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1,
    //         y: -((event.clientY - canvas.offsetTop) / canvas.clientHeight) * 2 + 1,
    //     };
    //
    //     const raycaster = new THREE.Raycaster();
    //     raycaster.setFromCamera(mouse, renderer.camera!);
    //
    //     const intersects = raycaster.intersectObjects(renderer.scene!.children, true);
    //
    //     if (intersects.length > 0) {
    //         const ijk = UtilsCore.worldToData(
    //             renderer.stackHelper!.stack.lps2IJK,
    //             intersects[0].point
    //         );
    //
    //         r1.stackHelper!.index = ijk.getComponent((r1.stackHelper!.orientation + 2) % 3);
    //         r2.stackHelper!.index = ijk.getComponent((r2.stackHelper!.orientation + 2) % 3);
    //         r3.stackHelper!.index = ijk.getComponent((r3.stackHelper!.orientation + 2) % 3);
    //
    //         updateLocalizer(r3, [r1.localizerHelper!, r2.localizerHelper!]);
    //         //updateClipPlane(r3, r3.plane!);
    //
    //         updateLocalizer(r1, [r2.localizerHelper!, r3.localizerHelper!]);
    //         //updateClipPlane(r1, r1.plane!);
    //
    //         updateLocalizer(r2, [r1.localizerHelper!, r3.localizerHelper!]);
    //         //updateClipPlane(r2, r2.plane!);
    //     }
    // };

    useEffect(() => {
        if (domElementRef.current && !renderer.isInit) {
            renderer.init(domElementRef.current, color, targetId);
            // renderer.domElement.addEventListener('dblclick', onDoubleClick);
        }
    });

    useFrame(() => {
        renderer.controls!.update();
        renderer.gl!.render(renderer.scene!, renderer.camera!);
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
