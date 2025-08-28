import { query } from "../config/db.ts";

export interface Patient {
    id: number;
    name: string;
    identification_number: string;
    dob: string;
    clinician: string | null;
    physician: string | null;
    start_of_care: string | null;
}

export interface CreatePatient {
    name: string;
    identification_number: string;
    dob: string;
    clinician?: string;
    physician?: string;
    start_of_care?: string;
}

export async function getAllPatients(): Promise<Patient[]> {
    const result = await query<Patient>('SELECT id, name FROM patient');
    return result.rows;
}

export async function getPatientById(id: number): Promise<Patient | null> {
    const result = await query<Patient>('SELECT * FROM patient WHERE id = $1', [id]);
    return result.rows[0] || null;
}