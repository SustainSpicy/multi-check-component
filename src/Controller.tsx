import React, { FC } from "react";
import { ControllerProps } from "./utils/types";
import { useMultiCheckContext } from "./providers/multiCheck/MulticheckProvider";

// Controller component that receives a render prop and provides it with context data
export const Controller: FC<ControllerProps> = ({ render }) => {
  // Destructure properties from context using custom hook
  const {
    options,
    values,
    columns,
    selectedValues,
    increaseValues,
    decreaseValues,
    onSelectedOptionsChange,
    decreaseColumns,
    increaseColumns,
    decreaseOptions,
    increaseOptions,
  } = useMultiCheckContext();

  return (
    <div>
      <h1>Multi Check Component</h1>
      <div>
        <button onClick={decreaseOptions}>-</button>
        <button onClick={increaseOptions}>+</button> Options count [
        {options.length}]
      </div>
      <div>
        <button onClick={decreaseValues}>-</button>
        <button onClick={increaseValues}>+</button> Values count [
        {values?.length ?? "undefined"}]
      </div>
      <div>
        <button onClick={decreaseColumns}>-</button>
        <button onClick={increaseColumns}>+</button> Columns [
        {columns ?? "undefined"}]
      </div>
      <div></div>
      <hr />
      {render(options, values, columns, onSelectedOptionsChange)}
      <div>
        <h2>Current selected values:</h2>
        <div>{selectedValues.join(",")}</div>
      </div>
    </div>
  );
};
