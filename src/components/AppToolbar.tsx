import {AppBar, createTheme, Grid, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography} from "@mui/material";

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
import {useState} from "react";
import AppToolbarButton from "./AppToolbarButton.tsx";

const AppToolbar = () => {

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

    //notes menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

                    <AppToolbarButton icon={WbSunnyIcon} text={"Окно"}/>

                    <AppToolbarButton icon={SearchIcon} text={"Масштаб"}/>

                    <AppToolbarButton icon={OpenWithIcon} text={"Панорама"}/>

                    <IconButton color="inherit" sx={buttonSx}>
                        <Grid container direction="column" alignItems="center">
                            <ViewInArIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                3D
                            </Typography>
                        </Grid>
                    </IconButton>

                    <IconButton
                        id="notesButton"
                        color="inherit"
                        sx={buttonSx}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Grid container direction="column" alignItems="center">
                            <CallMadeIcon sx={iconSx}/>
                            <Typography variant="caption" sx={textSx}>
                                Примечания
                            </Typography>
                        </Grid>
                    </IconButton>

                    <Menu
                        id="notesMenu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{'aria-labelledby': 'notesButton'}}
                        sx={{m: 0, p: 0}}
                    >
                        <MenuItem>Добавить нового пациента</MenuItem>
                        <MenuItem>Установить референтные точки комиссур</MenuItem>
                        <MenuItem>Вычислить расстояния между точками комиссур</MenuItem>
                        <MenuItem>Показать срез</MenuItem>
                        <MenuItem>Показать только аорту</MenuItem>
                        <MenuItem>Линия пришивания</MenuItem>
                        <MenuItem>Метаданные</MenuItem>

                    </Menu>



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

export default AppToolbar;