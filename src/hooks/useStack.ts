import { useContext } from 'react';
import { StackContext } from '../components/providers/StackProvider.tsx';

const useStack = () => {
    return useContext(StackContext);
};

export default useStack;
