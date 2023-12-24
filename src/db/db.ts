import Dexie, { Table } from 'dexie';
import Patient from '../models/Patient.ts';

export interface PatientDb extends Patient {
    dicomFiles: FileList;
}

export class SubDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    patients!: Table<PatientDb>;

    constructor() {
        super('Patients');
        this.version(1).stores({
            patients: 'id, age, name, dicomFiles', // Primary key and indexed props
        });
    }
}

export const db = new SubDexie();
