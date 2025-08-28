import type { Patient } from "@/types/patient";
import type { FC } from "react";

const PatientDetails: FC<{ patient: Patient }> = ({ patient }) => {
    const formatDate = (dateStr: string | null) =>
        dateStr ? new Date(dateStr).toLocaleDateString() : "—";

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{patient.name}</h2>
            <div className="flex flex-col gap-4 items-start">
                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Identification Number</span>
                    <span className="text-gray-700">{patient.identification_number}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Date of Birth</span>
                    <span className="text-gray-700">{formatDate(patient.dob)}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Clinician</span>
                    <span className="text-gray-700">{patient.clinician ?? "—"}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Physician</span>
                    <span className="text-gray-700">{patient.physician ?? "—"}</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-500 font-medium">Start of Care</span>
                    <span className="text-gray-700">{formatDate(patient.start_of_care)}</span>
                </div>
            </div>

        </div>
    );
};

export default PatientDetails;
