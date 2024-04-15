import { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const timeToString = (time: number) => {
    if (time <= 60) {
        return `${time} сек`;
    } else {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes} мин ${seconds} сек`;
    }
};
const AortaSegmentProgressSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [subscribe, setSubscribe] = useState(false);

    const [series, setSeries] = useState('');
    const [percent, setPercent] = useState(0);

    const [progress, setProgress] = useState(0);

    const [success, setSuccess] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState(0);

    if (!subscribe) {
        setSubscribe(true);
    }

    // if (loadFiles == totalFiles) {
    //     setTimeout(() => {
    //         setLoadFiles(0);
    //         setTotalFiles(-1);
    //         setOpen(false);
    //     }, 1000);
    // }

    useEffect(() => {
        const handleSegmentationStart = (
            event: CustomEvent<{ series: string; percent: number }>
        ) => {
            setOpen(true);
            setSeries(event.detail.series);
            setPercent(event.detail.percent);
        };

        document.addEventListener('segmentation-start', handleSegmentationStart as EventListener);

        const handleSegmentationProgress = (
            event: CustomEvent<{ series: string; progress: number }>
        ) => {
            setSeries(event.detail.series);
            setProgress(event.detail.progress);
        };

        document.addEventListener(
            'segmentation-progress',
            handleSegmentationProgress as EventListener
        );

        const handleSegmentationSuccess = (event: CustomEvent<{ series: string; file: File }>) => {
            setSuccess(true);
            setFileName(event.detail.file.name);
            setFileSize(event.detail.file.size);

            setTimeout(() => {
                //reset states
                setOpen(false);
                setSeries('');
                setPercent(0);
                setProgress(0);
                setSuccess(false);
                setFileName('');
                setFileSize(0);
            }, 10000);
        };

        document.addEventListener(
            'segmentation-success',
            handleSegmentationSuccess as EventListener
        );
    }, [subscribe]);

    return (
        <Snackbar open={open}>
            <SnackbarContent
                message={
                    success
                        ? `Получен файл аорты ${fileName} размером ${fileSize} байт`
                        : `Сегментация серии ${series} [${percent}%]: ${timeToString(progress)}`
                }
            />
        </Snackbar>
    );
};

export default AortaSegmentProgressSnackbar;
