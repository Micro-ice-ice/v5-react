interface PatientData {
    id: string;
    patientId: string;
    date: Date | string;
    numberOfFrames: number;
    dicomFiles: FileList;
    isAortaSegmented: boolean;
    aortaFiles?: File;
    aortaThreshold?: number;
}

export default PatientData;
