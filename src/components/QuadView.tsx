// refactor example from https://github.com/3dgraphicsplus/MedicalToolkit/tree/master/examples/viewers_quadview
import {Box} from "@mui/material";

const QuadView = () => {

    const visualizerSx = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#353535'
    };

    const rSx = {
        backgroundColor: '#000',
        width: '50%',
        maxWidth: '50%',
        height: '50%',
        boxSizing: 'border-box',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: 'none',
        position: 'relative',
        overflow: 'hidden',
    };




    return (
        <Box component="div" id="visualizer" sx={visualizerSx}>
            <Box component="div" id="r0" sx={rSx}></Box>
            <Box component="div" id="r1" sx={rSx}></Box>
            <Box component="div" id="r2" sx={rSx}></Box>
            <Box component="div" id="r3" sx={rSx}></Box>
        </Box>
    );
};

export default QuadView;