import { Input, Modal, ModalBody, ModalContent, ModalHeader, Button } from "@heroui/react";
import { type FC } from "react";
import { useNote } from "@/hooks/use-note";

const PatientNote: FC<{
    isOpen: boolean,
    onOpenChange: () => void,
    onClose: () => void
}> = ({ isOpen, onOpenChange, onClose }) => {
    const { uploading, handleFileChange, handleUpload, file } = useNote(onClose);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={!uploading} >
            <ModalContent>
                <ModalHeader>Add New Note</ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                    <Input
                        isDisabled={uploading}
                        label="Select voice recording"
                        type="file"
                        accept=".mp3"
                        onChange={handleFileChange}
                    />
                    <Button
                        onClickCapture={handleUpload}
                        isDisabled={uploading || !file}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PatientNote;
