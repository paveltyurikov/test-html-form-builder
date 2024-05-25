import { TextField, Select, CheckboxWithLabel, RadioGroup } from "formik-mui";
import {InputProps} from "./types.ts";


const COMMON_ATTRIBUTES = [
  { label: "Name", name: "name" },
  { label: "Label", name: "label" },
];

const COMMON_INITIAL_VALUES = {
  name: "",
  label: "",
};

export const CONFIG = {
  text: {
    title: "Text input",
    component: TextField,
    attributes: [
      ...COMMON_ATTRIBUTES,
      { name: "required", type: "checkbox", Label: { label: "Required?" } },
      { label: "Placeholder", name: "placeholder" },
    ],
    initialValues: {
      ...COMMON_INITIAL_VALUES,
      placeholder: "",
      required: false,
    },
  },
  select: {
    title: "Select box",
    component: Select,
    attributes: [
      ...COMMON_ATTRIBUTES,
      { label: "Options", name: "options" },
      { name: "required", type: "checkbox", Label: { label: "Required?" } },
    ],
    initialValues: {
      ...COMMON_INITIAL_VALUES,
      required: false,
      options: [],
    },
  },
  checkbox: {
    title: "Checkbox",
    component: CheckboxWithLabel,
    attributes: [...COMMON_ATTRIBUTES],
    initialValues: {
      ...COMMON_INITIAL_VALUES,
    },
  },
} as const;


export const getInitialValuesFromFields = (fields: InputProps[]) => {
  const res = {};
  fields.forEach((field) => (res[field.attributes.name] = ""));
  return res;
};