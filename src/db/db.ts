import Dexie, { Table } from 'dexie';
import Patient from '../models/Patient.ts';
import PatientData from '../models/PatientData.ts';

//https://dexie.org/docs/Tutorial/React
export class SubDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case

    patients!: Table<Patient>;

    patientsData!: Table<PatientData>;

    constructor() {
        super('Patients');
        this.version(1).stores({
            patients: 'id',
            patientsData: 'id',
            // Primary key and indexed props
        });
    }
}

export const db = new SubDexie();
