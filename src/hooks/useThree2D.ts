import { useContext } from 'react';
import { Renderer2DContext } from '../components/Canvas2D.tsx';

export const useThree2D = () => {
    const { scene, camera, gl, controls } = useContext(Renderer2DContext);

    return {
        scene: scene!,
        camera: camera!,
        controls: controls!,
        gl: gl!,
    };
};
