export interface Note {
    id: number;
    patient_id: number;
    transcription: string;
    summary: string | null;
    datetime: string;
    s3_key: string | null;
}
