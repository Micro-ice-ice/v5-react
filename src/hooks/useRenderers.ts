import { useContext } from 'react';
import { RenderersContext } from '../components/providers/RenderersProvider.tsx';

const useRenderers = () => {
    return useContext(RenderersContext);
};

export default useRenderers;
