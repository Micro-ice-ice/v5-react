import {Grid, IconButton, IconButtonProps, SvgIcon, SvgIconTypeMap, Typography} from "@mui/material";
import React from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";

interface AppToolBarButtonProps extends IconButtonProps{

    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string; },
    text: string

}

const AppToolbarButton: React.FC<AppToolBarButtonProps> = ({icon, text}) => {

    const buttonSx = {m: 0.5, p: 0, width: '4rem'};
    const textSx = {fontSize: '0.65rem', whiteSpace: 'nowrap', textAlign: 'center'};
    const iconSx = {fontSize: '1.75rem'}

    return (
        <IconButton color="inherit" sx={{...buttonSx, "& .MuiSvgIcon-root": iconSx}}>
            <Grid container direction="column" alignItems="center">
                <SvgIcon component={icon}/>
                <Typography variant="caption" sx={textSx}>
                    {text}
                </Typography>
            </Grid>
        </IconButton>
    );
};

export default AppToolbarButton;