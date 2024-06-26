import { useEffect } from 'react';

const useFrame = (callback: () => void) => {
    useEffect(() => {
        const animate = () => {
            callback();
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [callback]);
};

export default useFrame;
