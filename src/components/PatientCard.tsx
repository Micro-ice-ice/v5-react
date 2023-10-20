import React from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    IconButton,
    Typography
} from "@mui/material";
import Patient from "../models/Patient.ts";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PatientCardProps extends Patient{

}

const PatientCard: React.FC<PatientCardProps> = (props: PatientCardProps) => {
    return (
        // <Paper >

        // </Paper>
        <Card sx={{m: 0.1, width: '100%', borderRadius: 0}}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6" align="center" sx={{fontSize: '1rem'}}>
                        {"Пациент: " + props.name}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{fontSize: '1rem'}}>
                        {"Возраст: " + props.age}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PatientCard;