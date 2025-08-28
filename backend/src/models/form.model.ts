import { query } from "../config/db.ts";

export interface Form {
    id: number;
    note_id: number;
    data: {
        M1800: number;
        M1810: number;
        M1820: number;
        M1830: number;
        M1840: number;
        M1850: number;
        M1860: number;
    };
}

export interface CreateForm {
    note_id: number;
    data: {
        M1800: number;
        M1810: number;
        M1820: number;
        M1830: number;
        M1840: number;
        M1850: number;
        M1860: number;
    };
}

export async function createForm(form: CreateForm): Promise<Form> {
    const result = await query<Form>(
        `INSERT INTO form (note_id, data) VALUES ($1, $2) RETURNING *`,
        [form.note_id, form.data]
    );
    return result.rows[0];
}


export async function getFormByNoteId(note_id: number): Promise<Form[]> {
    const result = await query<Form>('SELECT * FROM form WHERE note_id = $1', [note_id]);
    return result.rows[0] || null;
}