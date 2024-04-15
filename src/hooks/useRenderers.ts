import { useContext } from 'react';
import { RenderersContext } from '../components/providers/RenderersProvider.tsx';

const useRenderers = () => {
    const renderersContext = useContext(RenderersContext);

    if (renderersContext) {
        return renderersContext;
    } else {
        throw new Error('Renderers context return null value');
    }
};

export default useRenderers;
