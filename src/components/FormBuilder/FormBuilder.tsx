import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, MenuItem, Stack } from "@mui/material";
import { Field, Formik } from "formik";
import { CheckboxWithLabel, Select } from "formik-mui";
import useDialog from "../../hooks/useDialog";
import CreateInputDialog from "./CreateInputDialog.tsx";
import { CONFIG, getInitialValuesFromFields } from "./lib";
import SubmitButton from "./SubmitButton";
import {
  FieldTypeName,
  InputProps,
  InputPropsAttrs,
  RenderFormProps,
} from "./types";


const RenderForm = ({ inputs }: RenderFormProps) => {
  return inputs.map((input) => {
    if (input.component === "select") {
      return (
        <Field
          key={input.attributes.name}
          component={Select}
          labelId={input.attributes.name}
          {...input.attributes}
        >
          {input.attributes.options
            ? input.attributes.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : null}
        </Field>
      );
    }
    if (input.component === "checkbox") {
      const { label, ...attributes } = input.attributes;
      return (
        <Field
          key={input.attributes.name}
          component={CheckboxWithLabel}
          {...attributes}
          Label={{ label }}
        >
          {input.attributes.options
            ? input.attributes.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : null}
        </Field>
      );
    }
    return (
      <Field
        key={input.attributes.name}
        component={CONFIG[input.component].component}
        {...input.attributes}
      />
    );
  });
};

const FormBuilder = () => {
  const [state, setState] = useState<{ inputs: InputProps[] }>({
    inputs: [],
  });
  const { isOpened, hide, toggleOpened } = useDialog();
  const handleAddFiled = (
    values: InputPropsAttrs,
    component: FieldTypeName,
  ) => {
    hide();
    setState((curr) => ({
      ...curr,
      inputs: [...curr.inputs, { component, attributes: values }],
    }));
  };
  return (
    <>
      <Formik
        key={JSON.stringify(getInitialValuesFromFields(state.inputs))}
        initialValues={getInitialValuesFromFields(state.inputs)}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        <Stack
          spacing={2}
          sx={{
            minWidth: 320,
            height: "100vh",
            boxSizing: "border-box",
            padding: 2,
          }}
          direction="column"
        >
          <Stack direction="row">
            <IconButton data-testid="add-input" onClick={toggleOpened}>
              <AddIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2}>
            <RenderForm inputs={state.inputs} />
          </Stack>
          <SubmitButton data-testid="submit-form-btn">Submit</SubmitButton>
        </Stack>
      </Formik>

      {isOpened ? (
        <CreateInputDialog open onClose={hide} onSubmit={handleAddFiled} />
      ) : null}
    </>
  );
};

export default FormBuilder;
