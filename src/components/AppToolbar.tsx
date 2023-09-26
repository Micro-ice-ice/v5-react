import {AppBar, createTheme, Menu, MenuItem, ThemeProvider, Toolbar, Typography} from "@mui/material";

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
import React, {useState} from "react";
import AppToolbarButton from "./AppToolbarButton.tsx";
import {NestedMenuItem} from "mui-nested-menu";

const AppToolbar = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#333"
            }
        },
    });

    //notes menu
    const [anchorElNotes, setAnchorElNotes] = useState<null | HTMLElement>(null)
    const openNotes = Boolean(anchorElNotes);
    const handleClickOpenNotes = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElNotes(event.currentTarget);
    const handleCloseNotes = () => setAnchorElNotes(null);

    const [anchorElSewLine, setAnchorElSewLine] = useState<null | HTMLElement>(null);
    const openSewLine = Boolean(anchorElSewLine);
    const handleMoveSewLine = (event: React.MouseEvent<HTMLElement>) => setAnchorElSewLine(event.currentTarget);

    const handleCloseSewLine = () => {

        console.log('close Sew Line');
        setAnchorElSewLine(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar variant="regular">

                    <Typography variant="h6" color="inherit" component="div">
                        V5 React
                    </Typography>

                    <AppToolbarButton icon={LayersIcon} text={"Стек"} edge={"start"}/>

                    <AppToolbarButton icon={WbSunnyIcon} text={"Окно"}/>

                    <AppToolbarButton icon={SearchIcon} text={"Масштаб"}/>

                    <AppToolbarButton icon={OpenWithIcon} text={"Панорама"}/>

                    <AppToolbarButton icon={ViewInArIcon} text={"3D"}/>

                    <AppToolbarButton icon={CallMadeIcon} text={"Примечания"} onClick={handleClickOpenNotes}/>

                    <Menu
                        id="notesMenu"
                        anchorEl={anchorElNotes}
                        open={openNotes}
                        onClose={handleCloseNotes}
                        // MenuListProps={{'aria-labelledby': 'notesButton'}}
                        sx={{m: 0, p: 0}}
                    >
                        <MenuItem>Добавить нового пациента</MenuItem>
                        <MenuItem>Установить референтные точки комиссур</MenuItem>
                        <MenuItem>Вычислить расстояния между точками комиссур</MenuItem>
                        <MenuItem>Показать срез</MenuItem>
                        <MenuItem>Показать только аорту</MenuItem>
                        <NestedMenuItem
                            label={"Линия пришивания"}
                            parentMenuOpen={openNotes}
                            sx={{px:1}}
                        >
                            <MenuItem onClick={() => {handleCloseNotes()}}>Добавить линию пришивания</MenuItem>
                            <MenuItem onClick={() => {handleCloseNotes()}}>Удалить все линии пришивания</MenuItem>
                        </NestedMenuItem>

                        <MenuItem>Метаданные</MenuItem>

                    </Menu>

                    <AppToolbarButton icon={InfoIcon} text={"Инфо"}/>

                    <AppToolbarButton icon={TuneIcon} text={"Pick Points"}/>

                    <AppToolbarButton icon={HelpIcon} text={"Помощь"}/>

                    <AppToolbarButton icon={LogoutIcon} text={"Выход"}/>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default AppToolbar;