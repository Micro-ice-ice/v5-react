import {
    AppBar,
    createTheme,
    Menu,
    MenuItem,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
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
import React, { useRef, useState } from 'react';
import AppToolbarButton from './AppToolbarButton.tsx';
import { NestedMenuItem } from 'mui-nested-menu';
import { db } from '../db/db.ts';
import DicomLoader from '../helpers/Dicom/DicomLoader.ts';
import { useAppSelector } from '../hooks/redux.ts';

const AppToolbar = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#333',
            },
        },
    });

    const currentPatient = useAppSelector((state) => state.currentPatient.patient);

    //notes menu
    const [anchorElNotes, setAnchorElNotes] = useState<null | HTMLElement>(null);
    const openNotes = Boolean(anchorElNotes);
    const handleClickOpenNotes = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorElNotes(event.currentTarget);
    const handleCloseNotes = () => setAnchorElNotes(null);

    const patientInputRef = useRef<HTMLInputElement>(null);
    const handleClickInputPatient = () => patientInputRef.current?.click();

    const handlePatientUpload = () => {
        const files = patientInputRef.current?.files;

        if (files) {
            DicomLoader.loadSeries(files)
                .then((model) => {
                    db.patients.put({
                        id: model.patientID,
                        name: model.patientName,
                        age: model.patientAge,
                    });

                    db.patientsData.put({
                        id: model.patientID,
                        files: files,
                    });

                    console.log('Added patient ' + model.patientName);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        handleCloseNotes();
    };

    const handleClickAortaSegmentation = async () => {
        const trashhold = 30;
        const patientData = await db.patientsData
            .where('id')
            .equals(currentPatient ? currentPatient.id : '')
            .first();
        console.log(patientData);
        if (patientData) {
            getAortaStl(patientData.files, trashhold)
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar variant="regular">
                    <Typography variant="h6" color="inherit" component="div">
                        V5 React
                    </Typography>

                    <AppToolbarButton icon={LayersIcon} text={'Стек'} edge={'start'} />

                    <AppToolbarButton icon={WbSunnyIcon} text={'Окно'} />

                    <AppToolbarButton icon={SearchIcon} text={'Масштаб'} />

                    <AppToolbarButton icon={OpenWithIcon} text={'Панорама'} />

                    <AppToolbarButton icon={ViewInArIcon} text={'3D'} />

                    <AppToolbarButton
                        icon={CallMadeIcon}
                        text={'Примечания'}
                        onClick={handleClickOpenNotes}
                    />

                    <Menu
                        id="notesMenu"
                        anchorEl={anchorElNotes}
                        open={openNotes}
                        onClose={handleCloseNotes}
                        // MenuListProps={{'aria-labelledby': 'notesButton'}}
                        sx={{ m: 0, p: 0 }}>
                        <MenuItem onClick={handleClickInputPatient}>
                            Добавить нового пациента
                            <input
                                type="file"
                                hidden
                                multiple
                                ref={patientInputRef}
                                onChange={handlePatientUpload}
                            />
                        </MenuItem>
                        <MenuItem>Установить референтные точки комиссур</MenuItem>
                        <MenuItem disabled={!currentPatient} onClick={handleClickAortaSegmentation}>
                            Сегментировать аорту
                        </MenuItem>
                        <MenuItem>Вычислить расстояния между точками комиссур</MenuItem>
                        <MenuItem>Показать срез</MenuItem>
                        <MenuItem>Показать только аорту</MenuItem>
                        <NestedMenuItem
                            label={'Линия пришивания'}
                            parentMenuOpen={openNotes}
                            sx={{ px: 1 }}>
                            <MenuItem
                                onClick={() => {
                                    handleCloseNotes();
                                }}>
                                Добавить линию пришивания
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseNotes();
                                }}>
                                Удалить все линии пришивания
                            </MenuItem>
                        </NestedMenuItem>

                        <MenuItem>Метаданные</MenuItem>
                    </Menu>

                    <AppToolbarButton icon={InfoIcon} text={'Инфо'} />

                    <AppToolbarButton icon={TuneIcon} text={'Pick Points'} />

                    <AppToolbarButton icon={HelpIcon} text={'Помощь'} />

                    <AppToolbarButton icon={LogoutIcon} text={'Выход'} />
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default AppToolbar;
