import { createContext, FC, ReactNode, useRef } from 'react';
import Renderer3D from '../../models/Renderer3D.ts';
import Renderer2D from '../../models/Renderer2D.ts';

interface Renderers {
    r0: Renderer3D;
    r1: Renderer2D;
    r2: Renderer2D;
    r3: Renderer2D;
}

export const RenderersContext = createContext<Renderers>({ r0: {}, r1: {}, r2: {}, r3: {} });
const RenderersProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const rendererRef = useRef<Renderers>({ r0: {}, r1: {}, r2: {}, r3: {} });

    return (
        <RenderersContext.Provider value={rendererRef.current}>
            {children}
        </RenderersContext.Provider>
    );
};

export default RenderersProvider;
