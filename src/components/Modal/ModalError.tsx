import { Modal as Modal_, ModalBody, ModalHeader } from "flowbite-react";

import { useModalErrorStore } from "@/stores/useModalErrorStore";

import { HiOutlineExclamationCircle } from "react-icons/hi";

const ModalError = () => {
  const { close, isOpen, children } = useModalErrorStore((state) => state);

  return (
    <Modal_ show={isOpen} onClose={() => close()} size="md" popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle
            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
          />
          {children}
        </div>
      </ModalBody>
    </Modal_>
  );
};

export default ModalError;