import instance from "../config/config";
import type { Patient } from "../types/patient";

const getPatients = async () => {
    const response: Patient[] = await instance.get("/patients");
    return response;
}

const getPatientById = async (id: number) => {
    const response: Patient = await instance.get(`/patients/${id}`);
    return response;
};

export const patientService = {
    getPatients,
    getPatientById,
};