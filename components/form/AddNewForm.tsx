import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ModalTabType } from "@/lib/features/modalSlice";
import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import CategoryDropdown from "./CategoryDropdown";
import useFormHook from "@/lib/hooks/useFormHook";

interface FormProps {
  isEdit: boolean;
  currentPage: ModalTabType;
  currentModalTab: ModalTabType;
  setCurrentModalTab: any;
}

export default function AddNewForm({
  isEdit,
  currentPage,
  currentModalTab,
  setCurrentModalTab,
}: FormProps) {
  const dispatch = useAppDispatch();

  const {
    handleOnFormSubmit,
    setAmount,
    setDate,
    setTitle,
    amount,
    date,
    title,
    setCategory,
    category,
  } = useFormHook();

  return (
    <ModalContent className="flex justify-center items-center">
      {(onClose) => (
        <>
          <ModalBody>
            <Input
              placeholder="Add Title"
              variant="bordered"
              color="primary"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Add Amount (INR)"
              variant="bordered"
              color="primary"
              value={amount?.toString()}
              onChange={(e: any) => setAmount(e.target.value)}
            />
            <Input
              variant="bordered"
              color="primary"
              type="date"
              value={date}
              onChange={(e: any) => setDate(e.target.value)}
            />
            {!isEdit && (
              <Tabs
                aria-label="Options"
                color="primary"
                variant="light"
                className="my-5 text-3xl"
                defaultSelectedKey={currentPage}
                onSelectionChange={(key: any) =>
                  dispatch(setCurrentModalTab(key))
                }
              >
                <Tab key="expense" title="Expense"></Tab>
                <Tab key="income" title="Income"></Tab>
                <Tab key="investment" title="Investment"></Tab>
              </Tabs>
            )}
            <CategoryDropdown
              currentModalTab={currentModalTab}
              setCategory={setCategory}
              category={category}
            />
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button
              color="secondary"
              onPress={onClose}
              className="relative right-3"
              onClick={(e) => handleOnFormSubmit(e)}
            >
              Submit
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
}
