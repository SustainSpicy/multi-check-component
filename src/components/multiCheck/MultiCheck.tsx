import "./MultiCheck.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FC } from "react";
import { Option, multiCheckProps } from "../../utils/types";
import { useMultiCheckContext } from "../../providers/multiCheck/MulticheckProvider";
import { render, screen, fireEvent } from "@testing-library/react";
/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. All the options (including the "Select All") should be split into several columns, and the order is from top to bottom in each column
 */

/**
 * A multi-select checkbox component with options split into multiple columns.
 *
 * @param label - Optional label for the component.
 * @param options - Array of options to display in the multi-select checkbox.
 * @param values - Optional array of values to pre-select in the multi-select checkbox.
 * @param columns - Optional number of columns to split the options into (default is 1).
 * @param onChange - Optional callback function to be called when the selection is changed.
 */

export const MultiCheck: FC<multiCheckProps> = (props) => {
  const { label, options, values = [], columns = 1, onChange } = props;
  // Get the selected values from the multi-check context.
  const { selectedValues } = useMultiCheckContext();
  // State to keep track of whether all options are checked.
  const [allChecked, setAllChecked] = useState<boolean>(false);
  // State to keep track of the currently checked values.
  const [checkedValues, setCheckedValues] = useState<string[]>(selectedValues);

  // Filter out any invalid values from the pre-selected value
  useEffect(() => {
    const newCheckedValues = checkedValues.filter((value) =>
      values.includes(value)
    );
    setCheckedValues(newCheckedValues);
  }, [values]);

  // Update the allChecked state when the checkedValues change.
  useEffect(() => {
    const areAllChecked =
      checkedValues.length > 0 && checkedValues.length === values.length;

    if (areAllChecked !== allChecked) {
      setAllChecked(areAllChecked);
    }
  }, [checkedValues, allChecked, values]);

  // Handler for checking/unchecking all options.
  const handleCheckAll = () => {
    if (!allChecked) {
      setCheckedValues(values);
    } else {
      setCheckedValues([]);
    }

    setAllChecked(!allChecked);
  };

  // Handler for checking/unchecking individual options.
  const handleCheckOption = (optionValue: string) => {
    const index = checkedValues.indexOf(optionValue);
    const newCheckedValues = [...checkedValues];

    if (index === -1) {
      const isValidOption = values?.includes(optionValue);
      if (isValidOption) {
        newCheckedValues.push(optionValue);
      }
    } else {
      newCheckedValues.splice(index, 1);
    }

    setCheckedValues(newCheckedValues);
  };

  // Helper function to get the number of options in each column.
  const getColumnSize = useCallback(
    () => Math.ceil(options.length / columns),
    [options, columns]
  );

  // Render an individual option.
  const renderOption = (option: Option) => {
    const isChecked = checkedValues.includes(option.value);
    // Render the "Select All" option.
    if (option.value === "000") {
      return (
        <label key={option.value}>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleCheckAll}
          />
          Select All
        </label>
      );
    }
    // Render a regular option.
    return (
      <div key={option.value}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckOption(option.value)}
          />
          {option.label}
        </label>
      </div>
    );
  };

  // Render a column of options.
  const renderColumn = (startIndex: number) => {
    const endIndex = startIndex + getColumnSize();
    const columnOptions = options.slice(startIndex, endIndex);

    return <div key={startIndex}>{columnOptions.map(renderOption)}</div>;
  };

  // Render all columns of options.
  const renderColumns = () => {
    const columnCount = columns || 1;
    const columnSize = getColumnSize();
    const columnsList = [];

    for (let i = 0; i < columnCount; i++) {
      const startIndex = i * columnSize;

      columnsList.push(renderColumn(startIndex));
    }

    return columnsList;
  };

  // Call the onChange callback when the selection changes.
  useEffect(() => {
    if (onChange) {
      const checkedOptions = options.filter((option) =>
        checkedValues.includes(option.value)
      );

      onChange(checkedOptions);
    }
  }, [checkedValues, options]);

  // Render the multi-select checkbox component.
  return (
    <div className="MultiCheck">
      {/* TODO */}
      {label && <label>{label}</label>}

      <div style={{ display: "flex" }}> {renderColumns()}</div>
    </div>
  );
};
