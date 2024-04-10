import { FC, ReactNode } from 'react';

import RenderersProvider from './providers/RenderersProvider.tsx';
import StackProvider from './providers/StackProvider.tsx';
import AortaProvider from './providers/AortaProvider.tsx';

const QuadViewProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <RenderersProvider>
            <StackProvider>
                <AortaProvider>{children}</AortaProvider>
            </StackProvider>
        </RenderersProvider>
    );
};

export default QuadViewProvider;
