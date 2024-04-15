import { Snackbar, SnackbarContent } from '@mui/material';
import { useEffect, useState } from 'react';

const FileLoadProgressSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [subscribe, setSubscribe] = useState(false);

    const [loadFiles, setLoadFiles] = useState(0);
    const [totalFiles, setTotalFiles] = useState(-1);

    if (!subscribe) {
        setSubscribe(true);
    }

    if (loadFiles == totalFiles) {
        setOpen(false);
        setLoadFiles(0);
        setTotalFiles(-1);
    }

    useEffect(() => {
        console.log('subscribe events');
        const handleLoadStart = ({ detail }: CustomEvent<{ files: FileList }>) => {
            setOpen(true);
            setTotalFiles(detail.files.length);
        };

        document.addEventListener('load-start', handleLoadStart as EventListener);

        const handleFetchSuccess = () => {
            setLoadFiles((loadFiles) => loadFiles + 1);
        };

        document.addEventListener('fetch-success', handleFetchSuccess as EventListener);
    }, [subscribe]);

    return (
        <Snackbar open={open}>
            <SnackbarContent
                message={`Загружено файлов ${loadFiles} из ${totalFiles}`}></SnackbarContent>
        </Snackbar>
    );
};

export default FileLoadProgressSnackbar;
