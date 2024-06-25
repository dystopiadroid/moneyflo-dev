import React, { useEffect } from "react";
import { Modal } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setCurrentModalTab,
  setIsEdit,
  setIsOpen,
} from "@/lib/features/modalSlice";
import { ModalTabType } from "@/lib/features/modalSlice";
import AddNewForm from "../form/AddNewForm";
import { setSelectedItem } from "@/lib/features/itemSlice";

export default function CreateNewModal() {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const currentPage = useAppSelector((state) => state.page) as ModalTabType;
  const currentModalTab = useAppSelector(
    (state) => state.modal.currentModalTab
  );
  const isEdit = useAppSelector((state) => state.modal.isEdit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentPage != undefined) {
      dispatch(setCurrentModalTab(currentPage));
    }
  }, [currentPage]);

  const onClose = () => {
    dispatch(setIsEdit(false));
    dispatch(setIsOpen(false));
    dispatch(setSelectedItem(null));
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
        isEdit={isEdit}
        currentPage={currentPage}
        currentModalTab={currentModalTab}
        setCurrentModalTab={setCurrentModalTab}
      />
    </Modal>
  );
}
