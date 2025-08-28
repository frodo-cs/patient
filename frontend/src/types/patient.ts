export interface Patient {
    id: number;
    name: string;
    identification_number: string;
    dob: string;
    clinician: string | null;
    physician: string | null;
    start_of_care: string | null;
}