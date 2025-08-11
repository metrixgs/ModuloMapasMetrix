import { Modal as Modal_, ModalBody, ModalHeader } from "flowbite-react";

import { useModalStore } from "@/stores/useModalStore";

const Modal = () => {
  const { close, isOpen, title, children, size } = useModalStore((state) => state);

  return (
    <Modal_ show={isOpen} onClose={() => close()} size={size}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody className="p-0">
        {children}
      </ModalBody>
    </Modal_>
  );
};

export default Modal;
