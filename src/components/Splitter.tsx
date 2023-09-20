import { Grid} from "@mui/material";


const Splitter = () => {

    const gridSx = {
        m: 0,
        p: 0,
        height: '100%',
        width: '90%',
    };

    const itemSX = {m: 0, p: 0, height: '21rem', border: 1};

    return (
        <Grid container spacing={0} sx={gridSx}>
            <Grid item xs={6} sx={itemSX}>
                Элемент 1
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                Элемент 2
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                Элемент 3
            </Grid>
            <Grid item xs={6} sx={itemSX}>
                Элемент 4
            </Grid>
        </Grid>
    );
};

export default Splitter;