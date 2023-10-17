import Dexie, {Table} from "dexie";

export interface Patient {

    id: string
    dicomFiles: FileList
}

export class SubDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    patients!: Table<Patient>;

    constructor() {
        super('Patients');
        this.version(1).stores({
            patients: 'id, dicomFiles' // Primary key and indexed props
        });
    }
}

export const db = new SubDexie();