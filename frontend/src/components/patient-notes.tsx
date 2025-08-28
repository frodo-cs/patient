import { usePatientNotes } from "@/hooks/use-patient-notes";
import type { Form } from "@/types/form";
import { Button, Accordion, AccordionItem, useDisclosure } from "@heroui/react";
import PatientNote from "./patient-note";

const descriptions: Record<keyof Form["data"], string> = {
    M1800: "Grooming",
    M1810: "Current ability to bathe",
    M1820: "Dressing upper body",
    M1830: "Dressing lower body",
    M1840: "Toileting hygiene",
    M1850: "Transfers",
    M1860: "Ambulation/locomotion"
};

const PatientNotes = () => {
    const { notes, loading, handleSelectNote, selectedNote, selectedForm } = usePatientNotes();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    return (
        <>
            <div className="grid grid-cols-3 gap-6 p-6">
                <div className="bg-white not-last:flex flex-col">
                    <Button className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600" onPress={onOpen}>
                        + New Note
                    </Button>
                    <div className="flex-1 overflow-y-auto">
                        {loading && <p>Loading...</p>}
                        {!loading &&
                            notes.map((note) => (
                                <button
                                    key={note.id}
                                    onClick={() => handleSelectNote(note)}
                                    className={`w-full text-left p-3 mb-2 rounded-lg transition-all duration-200 ${selectedNote?.id === note.id
                                        ? "bg-blue-100 shadow-sm"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <p className="font-medium">{note.transcription.slice(0, 30)}...</p>
                                    <p className="text-sm text-gray-500">{new Date(note.datetime).toLocaleString()}</p>
                                </button>
                            ))}
                    </div>
                </div>

                <div className="bg-white flex flex-col col-span-2 overflow-y-auto">
                    {selectedNote ? (
                        <Accordion variant="light" defaultExpandedKeys={["note-details"]}>
                            <AccordionItem
                                key="note-details"
                                title="Note Details"

                            >
                                <p className="mb-2">
                                    <span className="font-medium">Transcription:</span> {selectedNote.transcription}
                                </p>
                                <p>
                                    <span className="font-medium">Summary:</span> {selectedNote.summary ?? "—"}
                                </p>
                            </AccordionItem>

                            <AccordionItem
                                key="form-data"
                                title="OASIS Form"
                            >
                                <div className="space-y-2">
                                    {selectedForm &&
                                        Object.entries(selectedForm.data).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between border-b border-gray-200 py-2"
                                            >
                                                <span className="font-medium">{key} | {descriptions[key as keyof Form["data"]]}</span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                </div>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <p className="text-gray-400 text-center mt-10">
                            Select a note to view details and form data
                        </p>
                    )}
                </div>
            </div>
            <PatientNote isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
        </>

    );
};

export default PatientNotes;
