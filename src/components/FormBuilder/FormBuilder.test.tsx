import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, vitest } from "vitest";
import FormBuilder from "./FormBuilder.tsx";
import { Option } from "./types";


const fillCommonAttributes = async () => {
  const nameField = screen.getByLabelText(/name/i);
  await userEvent.type(nameField, "my_name");
  await expect(nameField).toHaveAttribute("value", "my_name");
  const labelField = screen.getByLabelText(/label/i);
  await userEvent.type(labelField, "My name");
  await expect(labelField).toHaveAttribute("value", "My name");
  const placeholderField = screen.getByLabelText(/placeholder/i);
  await userEvent.type(placeholderField, "My name");
  await expect(placeholderField).toHaveAttribute("value", "My name");
};

const addAndFillOption = async (option: Option, index: number) => {
  const addOptionBtn = screen.getByText(/add option/i);
  await userEvent.click(addOptionBtn);

  const label = await screen.getByTestId(`options.${index}.label`);
  const value = await screen.getByTestId(`options.${index}.value`);

  await userEvent.type(label, option.label);
  await userEvent.type(value, option.value);
};

describe("FormBuilder", () => {
  it("should be able to add Text input", async () => {
    const logSpy = vitest.spyOn(console, "log");
    render(<FormBuilder />);
    const addButton = screen.getByTestId("add-input");
    await userEvent.click(addButton);

    expect(screen.getByText(/create form field/i)).toBeInTheDocument();
    const selectBox = await screen.findByLabelText(/select input type/i);
    await userEvent.click(selectBox);
    const inputTextOption = await screen.findByTestId("option-text");
    await userEvent.click(inputTextOption);
    await expect(inputTextOption).not.toBeInTheDocument();
    await fillCommonAttributes();
    const addFieldButton = screen.getByTestId("add-field-btn");
    await userEvent.click(addFieldButton);
    await expect(
      await screen.queryByTestId(/select input type/i),
    ).not.toBeInTheDocument();
    const createdField = screen.getByLabelText(/My name/i);
    await userEvent.type(createdField, "My name");
    const submitBtn = screen.getByTestId("submit-form-btn");
    expect(submitBtn).toBeEnabled();
    await userEvent.click(submitBtn);
    expect(logSpy).toHaveBeenCalledWith({ my_name: "My name" });
  });
  it("should be able to add Select input", async () => {
    const logSpy = vitest.spyOn(console, "log");
    render(<FormBuilder />);
    const addButton = screen.getByTestId("add-input");
    await userEvent.click(addButton);

    expect(screen.getByText(/create form field/i)).toBeInTheDocument();
    const selectBox = await screen.findByLabelText(/select input type/i);
    await userEvent.click(selectBox);
    const inputSelecttOption = await screen.findByTestId("option-select");
    await userEvent.click(inputSelecttOption);
    await expect(inputSelecttOption).not.toBeInTheDocument();
    await fillCommonAttributes();
    const addOptionBtn = screen.getByText(/add option/i);
    expect(addOptionBtn).toBeInTheDocument();

    await addAndFillOption({ label: "Option 1", value: "option1" }, 0);
    await addAndFillOption({ label: "Option 2", value: "option2" }, 1);

    const addFieldButton = screen.getByTestId("add-field-btn");
    await userEvent.click(addFieldButton);
    await expect(
      await screen.queryByTestId(/select input type/i),
    ).not.toBeInTheDocument();
    const createdField = screen.getByLabelText(/My name/i);
    await userEvent.click(createdField);
    const option2 = await screen.queryByText(/option 2/i)
    await userEvent.click(option2);

    const submitBtn = screen.getByTestId("submit-form-btn");
    expect(submitBtn).toBeEnabled();
    await userEvent.click(submitBtn);
    expect(logSpy).toHaveBeenCalledWith({ my_name: "option2" });
  });
  it("should be able to add Checkbox input", async () => {
    const logSpy = vitest.spyOn(console, "log");
    render(<FormBuilder />);
    const addButton = screen.getByTestId("add-input");
    await userEvent.click(addButton);

    expect(screen.getByText(/create form field/i)).toBeInTheDocument();
    const selectBox = await screen.findByLabelText(/select input type/i);
    await userEvent.click(selectBox);
    const inputTextOption = await screen.findByTestId("option-checkbox");
    await userEvent.click(inputTextOption);
    await expect(inputTextOption).not.toBeInTheDocument();
    await fillCommonAttributes();
    const addFieldButton = screen.getByTestId("add-field-btn");
    await userEvent.click(addFieldButton);
    await expect(
      await screen.queryByTestId(/select input type/i),
    ).not.toBeInTheDocument();
    const createdField = screen.getByLabelText(/My name/i);
    await userEvent.click(createdField);
    const submitBtn = screen.getByTestId("submit-form-btn");
    expect(submitBtn).toBeEnabled();
    await userEvent.click(submitBtn);
    expect(logSpy).toHaveBeenCalledWith({ my_name: true });
  });
});
