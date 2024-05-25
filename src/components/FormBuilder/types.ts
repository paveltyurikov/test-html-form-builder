import { DialogProps } from "@mui/material";
import { ArrayHelpers } from "formik";
import { CONFIG } from "./lib.ts";


export type RowHelpersProps = {
  arrayHelpers: ArrayHelpers;
  index: number;
};

export type Option = {
  label: string;
  value: string;
};

export type InputPropsAttrs = {
  name: string;
  label?: string;
  placeholder?: string;
  value: unknown;
  required?: boolean;
  options?: Option[];
};

export type InputProps = {
  component: FieldTypeName;
  attributes: InputPropsAttrs;
};

export type FormFieldProps = {
  input: InputProps;
};

export type RenderFormProps={
  inputs: InputProps[];
}

export type AddInputDialogProps = {
  open: DialogProps["open"];
  onClose: () => void;
  onSubmit: (attributes: InputPropsAttrs, componentName: FieldTypeName) => void;
};

export type FieldTypeName = keyof typeof CONFIG;
