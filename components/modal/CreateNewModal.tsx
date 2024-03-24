import React, { useEffect } from "react";
import { Modal } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentModalTab, setIsOpen } from "@/lib/features/modalSlice";
import { ModalTabType } from "@/lib/features/modalSlice";
import AddNewForm from "../form/AddNewForm";

export default function CreateNewModal() {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const currentPage = useAppSelector((state) => state.page) as ModalTabType;
  const currentModalTab = useAppSelector(
    (state) => state.modal.currentModalTab
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentPage != undefined) {
      dispatch(setCurrentModalTab(currentPage));
    }
  }, [currentPage]);

  const onClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-card p-10"
      isDismissable={false}
      backdrop="opaque"
    >
      <AddNewForm
        currentPage={currentPage}
        currentModalTab={currentModalTab}
        setCurrentModalTab={setCurrentModalTab}
      />
    </Modal>
  );
}
