import { Listbox, ListboxItem, Spinner, Card, CardBody } from "@heroui/react"
import { usePatients } from "../hooks/use-patients"
import PatientDetails from "./patient-details"
import PatientNotes from "./patient-notes"

const PatientList = () => {
    const { onPatientClick, patients, loading, selectedPatient, selectedId } = usePatients()

    return (
        <div className="p-6 h-screen flex flex-col">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Patients</h1>
            <div className="grid grid-cols-4 gap-6 flex-grow">
                <Card shadow="sm" className="col-span-1 rounded-2xl border border-gray-200" >
                    <CardBody className="p-4">
                        {patients.length === 0 && (
                            <p className="text-gray-400 text-center py-8">No patients found</p>
                        )}
                        <Listbox
                            className="flex flex-col space-y-2"
                            aria-label="Patient List"
                        >
                            {patients.map((patient) => (
                                <ListboxItem key={patient.id} onClick={() => onPatientClick(patient.id)}
                                    className={`rounded-sm p-3 transition-all duration-200 cursor-pointer
                                         ${selectedId === patient.id
                                            ? "bg-blue-100 text-blue-700 shadow-sm"
                                            : "hover:bg-gray-50"
                                        }`}>
                                    {patient.name}
                                </ListboxItem>
                            ))}
                        </Listbox>

                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="p-6">
                        {loading && <Spinner size="lg" color="primary" />}
                        {!loading && selectedPatient && <PatientDetails patient={selectedPatient} />}
                        {!loading && !selectedPatient && (
                            <p className="text-gray-400 text-center">Select a patient to view details</p>
                        )}
                    </CardBody>
                </Card>
                <Card shadow="sm" className="col-span-2 rounded-2xl border border-gray-200">
                    <CardBody className="p-6 ">
                        {loading && <Spinner size="lg" color="primary" />}
                        {!loading && selectedPatient && <PatientNotes />}
                        {!loading && !selectedPatient && (
                            <p className="text-gray-400 text-center">Select a patient to view details</p>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default PatientList
