import { Select, SelectItem } from "@nextui-org/react";
import { expenseCategories, investmentCategories } from "@/utils/content";
import { ModalTabType } from "@/lib/features/modalSlice";
import React from "react";

interface CategoryProps {
  isEdit: boolean,
  currentModalTab: ModalTabType;
  setCategory: Function;
  category: string;
}

export default function CategoryDropdown({
  isEdit,
  currentModalTab,
  setCategory,
  category,
}: CategoryProps) {

  if(currentModalTab === "income"){
    return;
  }

  return (
    <>
      <Select
          color="primary"
          variant="bordered"
          placeholder="Select Category"
          className="max-w-xs"
          defaultSelectedKeys={isEdit ? [category] : undefined}
          onChange={(e) => setCategory(e.target.value)}
      >
        {currentModalTab === "expense" ? (
            expenseCategories.map((item: string) => (
                <SelectItem color="primary" key={item} value={item}>
                  {item}
                </SelectItem>
            ))
        ) : (investmentCategories.map((item: string) => (
            <SelectItem color="primary" key={item} value={item}>
              {item}
            </SelectItem>
        )))}
      </Select>
    </>
  );
}
