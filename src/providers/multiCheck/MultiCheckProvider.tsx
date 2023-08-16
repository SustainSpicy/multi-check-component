import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  MultiCheckContextProviderProps,
  MultiCheckContextValue,
  Option,
} from "../../utils/types";
import { allOptions } from "../../utils/constants";
import lodash from "lodash";

const MultiCheckContext = createContext<MultiCheckContextValue>({
  options: [],
  values: [],
  columns: 1,
  selectedValues: [],
  setOptions: () => {},
  setValues: () => {},
  setColumns: () => {},
  setSelectedValues: () => {},
  increaseValues: () => {},
  decreaseValues: () => {},
  onSelectedOptionsChange: () => {},
  decreaseColumns: () => {},
  increaseColumns: () => {},
  decreaseOptions: () => {},
  increaseOptions: () => {},
});

// Create an array of all values for later use
const allValues = allOptions.map((item) => item.value);

const MultiCheckContextProvider = ({
  children,
}: MultiCheckContextProviderProps) => {
  // Set up state variables for options, values, and columns
  const [options, setOptions] = useState<Option[]>(allOptions);
  const [values, setValues] = useState<string[] | undefined>(
    allOptions.map((option) => option.value)
  );
  const [columns, setColumns] = useState<number>(1);

  // Set up state variable for selected values
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Add the "Select All" option to the beginning of the options array
  useEffect(() => {
    options.unshift({ label: "Select All", value: "000" });
  }, []);

  // Define functions to increase and decrease the number of options
  function decreaseOptions() {
    setOptions((it) => allOptions.slice(0, it.length - 1));
  }
  function increaseOptions() {
    setOptions((it) => allOptions.slice(0, it.length + 1));
  }

  // Define functions to increase and decrease the number of and values
  function decreaseValues() {
    setValues((prev) => {
      if (prev === undefined) return allValues;
      if (prev.length === 0) return undefined;
      //   return lodash.sampleSize(allValues, prev.length - 1);
      return prev.slice(0, prev.length - 1);
    });
  }
  function increaseValues() {
    setValues((prev) => {
      if (prev === undefined) return [];
      if (prev.length === allValues.length) return undefined;
      const size = prev.length + 1;
      return lodash.sampleSize(allValues, size);
    });
  }

  // Define a function to update the selected values when the options change
  function onSelectedOptionsChange(options: Option[]): void {
    setSelectedValues(
      options
        .filter((option) => values?.includes(option.value))
        .map((option) => option.value)
    );
  }

  // Define functions to increase and decrease the number of columns
  function decreaseColumns() {
    setColumns((n) => {
      if (n === undefined || n === 0) {
        return 0;
      }
      return n - 1;
    });
  }
  function increaseColumns() {
    setColumns((n) => (n === undefined ? 0 : n + 1));
  }

  // Define the context value
  const contextValue: MultiCheckContextValue = {
    options,
    values,
    columns,
    selectedValues,
    increaseValues,
    decreaseValues,
    decreaseOptions,
    increaseOptions,
    onSelectedOptionsChange,
    decreaseColumns,
    increaseColumns,
  };

  // Return the context provider with the context value and children as props
  return (
    <MultiCheckContext.Provider value={contextValue}>
      {children}
    </MultiCheckContext.Provider>
  );
};

export default MultiCheckContextProvider;

export const useMultiCheckContext = (): MultiCheckContextValue => {
  return useContext(MultiCheckContext);
};
