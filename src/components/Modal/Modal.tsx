import { Modal as Modal_, ModalHeader } from "flowbite-react";

import { useModalStore } from "@/stores/useModalStore";

const Modal = () => {
  const { close, isOpen, title, children, size } = useModalStore((state) => state);

  return (
    <Modal_ show={isOpen} onClose={() => close()} size={size}>
      <ModalHeader>{title}</ModalHeader>
      {children}
    </Modal_>
  );
};

export default Modal;
