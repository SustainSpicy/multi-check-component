import { ReactNode } from "react";

export type Option = {
  label: string;
  value: string;
};

export type multiCheckProps = {
  // the label text of the whole component
  label?: string;
  // Assume no duplicated labels or values
  // It may contain any values, so be careful for you "Select All" option
  options: Option[];
  // Always be non-negative integer.
  // The default value is 1
  // 0 is considered as 1
  // We only check [0, 1, 2, ... 10], but it should work for greater number
  columns?: number;
  // Which options should be selected.
  // - If `undefined`, makes the component in uncontrolled mode with no default options checked, but the component is still workable;
  // - if not undefined, makes the component in controlled mode with corresponding options checked.
  // - Assume no duplicated values.
  // - It may contain values not in the options.
  values?: string[];
  // if not undefined, when checked options are changed, they should be passed to outside
  // if undefined, the options can still be selected, but won't notify the outside
  onChange?: (options: Option[]) => void;
};

export type ControllerProps = {
  render: (
    options: Option[],
    values?: string[],
    columns?: number,
    onChange?: (options: Option[]) => void
  ) => React.ReactNode;
};

export interface MultiCheckContextValue {
  options: Option[];
  values: string[] | undefined;
  columns: number;
  selectedValues: string[];
  setOptions?: React.Dispatch<React.SetStateAction<Option[]>>;
  setValues?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setColumns?: React.Dispatch<React.SetStateAction<number>>;
  setSelectedValues?: React.Dispatch<React.SetStateAction<string[]>>;
  onSelectedOptionsChange: (options: Option[]) => void;
  increaseValues: () => void;
  decreaseValues: () => void;
  decreaseColumns: () => void;
  increaseColumns: () => void;
  decreaseOptions: () => void;
  increaseOptions: () => void;
}

export interface MultiCheckContextProviderProps {
  children: ReactNode;
}
