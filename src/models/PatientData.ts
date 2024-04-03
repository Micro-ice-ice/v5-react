interface PatientData {
    id: string;
    patientId: string;
    date: Date | string;
    numberOfFrames: number;
    dicomFiles: FileList;
    isAortaSegmented: boolean;
    aortaFile?: File;
    aortaThreshold?: number;
}

export default PatientData;
