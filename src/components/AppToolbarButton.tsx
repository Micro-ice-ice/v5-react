import {Grid, IconButton, IconButtonProps, SvgIcon, SvgIconTypeMap, Typography} from "@mui/material";
import React from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";

interface AppToolBarButtonProps extends IconButtonProps {

    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string; },
    text: string

}

const AppToolbarButton: React.FC<AppToolBarButtonProps> = (props) => {

    const buttonSx = {m: 0.5, p: 0, width: '4rem'};
    const textSx = {fontSize: '0.65rem', whiteSpace: 'nowrap', textAlign: 'center'};
    const iconSx = {fontSize: '1.75rem'}

    return (
        <IconButton edge={props.edge} color="inherit" sx={{...buttonSx, "& .MuiSvgIcon-root": iconSx}}
                    onClick={props.onClick}>
            <Grid container direction="column" alignItems="center">
                <SvgIcon component={props.icon}/>
                <Typography variant="caption" sx={textSx}>
                    {props.text}
                </Typography>
            </Grid>
        </IconButton>
    );
};

export default AppToolbarButton;