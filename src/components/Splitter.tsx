import { Grid} from "@mui/material";
import {Canvas} from "@react-three/fiber";
import ThreeCanvas from "./ThreeCanvas.tsx";


const Splitter = () => {

    const gridSx = {
        m: 0,
        p: 0,
        height: '100%',
        width: '90%',
    };

    const itemSX = {m: 0, p: 0.25, height: '21.25rem', border: 1};

    return (
        <Grid container spacing={0} sx={gridSx}>
            <Grid item xs={6} sx={itemSX}>
                <Canvas id="mainCanvas" >
                    <ThreeCanvas/>
                </Canvas>
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                <Canvas>
                    <ThreeCanvas/>
                </Canvas>
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                <Canvas>
                    <ThreeCanvas/>
                </Canvas>
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                <Canvas>
                    <ThreeCanvas/>
                </Canvas>
            </Grid>
        </Grid>
    );
};

export default Splitter;