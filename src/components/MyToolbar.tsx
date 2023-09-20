import {AppBar, createTheme, Grid, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";

import LayersIcon from '@mui/icons-material/Layers';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import SearchIcon from '@mui/icons-material/Search';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CallMadeIcon from '@mui/icons-material/CallMade';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

const MyToolbar = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#333"
            }
        },
    });

    const buttonSx = {m: 0.5, p: 0, width: '4rem'};
    const textSx = {fontSize: '0.65rem', whiteSpace: 'nowrap', textAlign: 'center'};
    const iconSx = {fontSize: '1.75rem'}

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar variant="regular">

                    <Typography variant="h6" color="inherit" component="div">
                        V5 React
                    </Typography>

                    <IconButton edge="start" color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <LayersIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Стек
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <WbSunnyIcon  sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Окно
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <SearchIcon  sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Масштаб
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <OpenWithIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Панорама
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <ViewInArIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                3D
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <CallMadeIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Примечания
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <InfoIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Инфо
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <TuneIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Pick Points
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <HelpIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Помощь
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton edge="end" color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <LogoutIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Выход
                            </Typography>
                        </Grid>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default MyToolbar;