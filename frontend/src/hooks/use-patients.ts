import { useEffect, useState, useCallback } from "react"
import { patientService } from "../services/patient-service"
import type { Patient } from "../types/patient"
import { usePatientStore } from "@/store/patient"

export const usePatients = () => {
    const [patients, setPatients] = useState<Patient[]>([])
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [loading, setLoading] = useState(false)
    const { setId, id } = usePatientStore()

    const fetchPatients = useCallback(async () => {
        try {
            const response = await patientService.getPatients()
            setPatients(response)
        } catch (err) {
            console.error("Error fetching patients:", err)
        }
    }, [])

    const fetchPatientData = useCallback(async (patientId: number) => {
        setLoading(true)
        try {
            const response = await patientService.getPatientById(patientId)
            setSelectedPatient(response)
        } catch (err) {
            console.error(`Error fetching patient ${patientId}:`, err)
        } finally {
            setLoading(false)
        }
    }, [])

    const onPatientClick = (patientId: number) => {
        setId(patientId)
    }

    useEffect(() => {
        fetchPatients()
    }, [fetchPatients])

    useEffect(() => {
        if (id) {
            fetchPatientData(id)
        } else {
            setSelectedPatient(null)
        }
    }, [id])

    return {
        patients,
        onPatientClick,
        selectedPatient,
        loading,
        selectedId: id,
    }
}
