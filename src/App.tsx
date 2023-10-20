import './App.css'
import AppToolbar from "./components/AppToolbar.tsx";
import QuadView from "./components/QuadView.tsx";
import PatientCardList from "./components/PatientCardList.tsx";
import {Stack} from "@mui/material";


function App() {

    return (
        <>
            <AppToolbar/>

            <Stack direction="row">
                <QuadView/>
                <PatientCardList/>
            </Stack>
        </>
    )
}

export default App
