// TODO more tests

describe("MultiCheck", () => {
  describe("initialize", () => {
    it("renders the label if label provided", () => {
      // TODO
    });
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional DOM matchers

import { MultiCheck } from "./MultiCheck";

// Sample options for testing
const testOptions = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
  { label: "Option 4", value: "option-4" },
];

describe("MultiCheck", () => {
  test("renders the component with options and 'Select All'", () => {
    render(<MultiCheck options={testOptions} />);

    // Check if the 'Select All' option is rendered
    expect(screen.getByLabelText("Select All")).toBeInTheDocument();

    // Check if all regular options are rendered
    testOptions.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  test("checks all options when 'Select All' is clicked", () => {
    render(<MultiCheck options={testOptions} />);

    const selectAllCheckbox = screen.getByLabelText("Select All");

    // Click 'Select All' checkbox
    fireEvent.click(selectAllCheckbox);

    // Check if all regular options are checked
    testOptions.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeChecked();
    });
  });

  test("unchecks all options when 'Select All' is clicked twice", () => {
    render(<MultiCheck options={testOptions} />);

    const selectAllCheckbox = screen.getByLabelText("Select All");

    // Click 'Select All' checkbox twice
    fireEvent.click(selectAllCheckbox);
    fireEvent.click(selectAllCheckbox);

    // Check if all regular options are unchecked
    testOptions.forEach((option) => {
      expect(screen.getByLabelText(option.label)).not.toBeChecked();
    });
  });

  test("checks individual options when clicked", () => {
    render(<MultiCheck options={testOptions} />);

    // Get individual option checkboxes
    const option1Checkbox = screen.getByLabelText("Option 1");
    const option3Checkbox = screen.getByLabelText("Option 3");

    // Click individual option checkboxes
    fireEvent.click(option1Checkbox);
    fireEvent.click(option3Checkbox);

    // Check if the selected options are checked
    expect(option1Checkbox).toBeChecked();
    expect(option3Checkbox).toBeChecked();
  });

  test("calls onChange with correct selected options when selection changes", () => {
    const mockOnChange = jest.fn();
    render(<MultiCheck options={testOptions} onChange={mockOnChange} />);

    // Get individual option checkboxes
    const option1Checkbox = screen.getByLabelText("Option 1");
    const option2Checkbox = screen.getByLabelText("Option 2");

    // Click individual option checkboxes
    fireEvent.click(option1Checkbox);
    fireEvent.click(option2Checkbox);

    // Expect onChange to be called with selected options
    expect(mockOnChange).toHaveBeenCalledWith([testOptions[0], testOptions[1]]);
  });

  // Add more test cases as needed to cover other functionality
});
