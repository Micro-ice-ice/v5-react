import { FC, ReactNode } from 'react';

import RenderersProvider from './RenderersProvider.tsx';
import StackProvider from './StackProvider.tsx';
import AortaProvider from './AortaProvider.tsx';

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
