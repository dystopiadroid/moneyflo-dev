import { Select, SelectItem } from "@nextui-org/react";
import { expenseCategories, investmentCategories } from "@/utils/content";
import { ModalTabType } from "@/lib/features/modalSlice";
import React from "react";

interface CategoryProps {
  currentModalTab: ModalTabType;
  setCategory: Function;
}

export default function CategoryDropdown({
  currentModalTab,
  setCategory,
}: CategoryProps) {
  return (
    <>
      {currentModalTab === "expense" && (
        <Select
          color="primary"
          variant="bordered"
          placeholder="Select Category"
          className="max-w-xs"
          onChange={(e) => setCategory(e.target.value)}
        >
          {expenseCategories.map((item) => (
            <SelectItem color="primary" key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
      )}
      {currentModalTab === "investment" && (
        <Select
          color="primary"
          variant="bordered"
          placeholder="Select Category"
          className="max-w-xs"
          onChange={(e) => setCategory(e.target.value)}
        >
          {investmentCategories.map((item) => (
            <SelectItem color="primary" key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
      )}
    </>
  );
}
