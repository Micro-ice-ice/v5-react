import QuadViewProvider from './QuadViewProvider.tsx';
import Canvas3D from './Canvas3D.tsx';
import Content3D from './Content3D.tsx';
import Canvas2D from './Canvas2D.tsx';
import Content2D from './Content2D.tsx';

const QuadView = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                backgroundColor: '#353535',
            }}>
            <QuadViewProvider>
                <Canvas3D targetId={'0'}>
                    <Content3D />
                </Canvas3D>
                <Canvas2D
                    color={0x121212}
                    sliceOrientation={'axial'}
                    sliceColor={0xff1744}
                    targetId={'1'}>
                    <Content2D />
                </Canvas2D>
                <Canvas2D
                    color={0x121212}
                    sliceOrientation={'sagittal'}
                    sliceColor={0xffea00}
                    targetId={'2'}>
                    <Content2D />
                </Canvas2D>
                <Canvas2D
                    color={0x121212}
                    sliceOrientation={'coronal'}
                    sliceColor={0x76ff03}
                    targetId={'3'}>
                    <Content2D />
                </Canvas2D>
            </QuadViewProvider>
        </div>
    );
};

export default QuadView;
