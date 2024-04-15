import { createContext, FC, ReactNode, useRef } from 'react';
import Renderer3D from '../../helpers/Renderer3D.ts';
import Renderer2D from '../../helpers/Renderer2D.ts';

interface Renderers {
    r0: Renderer3D;
    r1: Renderer2D;
    r2: Renderer2D;
    r3: Renderer2D;
}

export const RenderersContext = createContext<Renderers | null>(null);

const RenderersProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const rendererRef = useRef<Renderers>({
        r0: new Renderer3D(),
        r1: new Renderer2D(),
        r2: new Renderer2D(),
        r3: new Renderer2D(),
    });

    return (
        <RenderersContext.Provider value={rendererRef.current}>
            {children}
        </RenderersContext.Provider>
    );
};

export default RenderersProvider;
