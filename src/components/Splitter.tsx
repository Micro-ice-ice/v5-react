import { Grid} from "@mui/material";

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
                Element 1
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                Element 2
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                Element 3
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                Element 4
            </Grid>
        </Grid>
    );
};

export default Splitter;