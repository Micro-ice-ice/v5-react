import './App.css';
import AppToolbar from './components/AppToolbar.tsx';
import PatientCardList from './components/PatientCardList.tsx';
import { Stack } from '@mui/material';
import QuadView from './components/QuadView.tsx';

function App() {
    return (
        <div style={{ height: '100vh' }}>
            <AppToolbar />

            <Stack direction="row" height="100%">
                <PatientCardList />
                <QuadView />
            </Stack>
        </div>
    );
}

export default App;
