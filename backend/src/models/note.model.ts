import { query } from "../config/db.ts";

export interface Note {
    id: number;
    patient_id: number;
    transcription: string;
    summary: string | null;
    datetime: string;
    s3_key: string | null;
}

export interface CreateNote {
    patient_id: number;
    transcription: string;
    summary?: string;
    s3_key?: string;
}

export async function createNote(note: CreateNote): Promise<Note> {
    const result = await query<Note>(
        'INSERT INTO note (patient_id, transcription, summary, s3_key, datetime) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [note.patient_id, note.transcription, note.summary || null, note.s3_key || null]
    );
    return result.rows[0];
}

export async function getNotesByPatientId(patient_id: number): Promise<Note[]> {
    const result = await query<Note>('SELECT * FROM note WHERE patient_id = $1 ORDER BY datetime DESC', [patient_id]);
    return result.rows;
}

export async function getNoteById(note_id: number): Promise<Note | null> {
    const result = await query<Note>('SELECT * FROM note WHERE id = $1', [note_id]);
    return result.rows[0] || null;
}