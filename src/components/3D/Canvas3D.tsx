import { FC, ReactNode, useEffect, useRef } from 'react';
import useFrame from '../../hooks/useFrame.ts';
import useRenderers from '../../hooks/useRenderers.ts';

interface Canvas3DProps {
    children?: ReactNode;
    color?: number;
    targetId: string;
}

const Canvas3D: FC<Canvas3DProps> = ({ children, color = 0x212121, targetId }) => {
    const domElementRef = useRef<HTMLDivElement>(null);
    const { r0 } = useRenderers();
    const renderer = r0;

    console.log('Canvas 3D');

    useFrame(() => {
        renderer.controls!.update();

        renderer.light!.position.copy(renderer.camera!.position);
        renderer.gl!.render(renderer.scene!, renderer.camera!);
    });

    useEffect(() => {
        // Initialize on mount
        if (domElementRef.current && !renderer.isInit) {
            renderer.init(domElementRef.current, color, targetId);
        }
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
