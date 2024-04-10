import { useContext } from 'react';
import { AortaContext } from '../components/providers/AortaProvider.tsx';

const useAorta = () => {
    return useContext(AortaContext);
};

export default useAorta;
