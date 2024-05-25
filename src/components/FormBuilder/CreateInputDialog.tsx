import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
} from "@mui/material";
import { Field, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-mui";
import { CONFIG } from "./lib.ts";
import SelectOptionsForm from "./SelectOptionsForm.tsx";
import SubmitButton from "./SubmitButton";
import { AddInputDialogProps, FieldTypeName } from "./types.ts";


type SelectFieldTypeProps = Partial<SelectProps>;
const SelectFieldType = ({ value, onChange }: SelectFieldTypeProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-input">Select input type</InputLabel>
      <Select labelId="select-input" onChange={onChange} value={value}>
        <MenuItem data-testid={`option-text`} key="text" value="text">
          Text Field
        </MenuItem>
        <MenuItem data-testid={`option-select`} key="select" value="select">
          Select Field
        </MenuItem>
        <MenuItem
          data-testid={`option-checkbox`}
          key="checkbox"
          value="checkbox"
        >
          Checkbox Field
        </MenuItem>
      </Select>
    </FormControl>
  );
};

const CommonFields = () => {
  return (
    <>
      <Field component={TextField} name="name" label="Field Name" />
      <Field component={TextField} name="label" label="Field Label" />
      <Field
        component={TextField}
        name="placeholder"
        label="Field Placeholder"
      />
    </>
  );
};

const CreateInputDialog = ({
  open,
  onClose,
  onSubmit,
}: AddInputDialogProps) => {
  const [fieldType, setFieldType] = useState<FieldTypeName>("text");

  const handleChange = (e: SelectChangeEvent) => {
    setFieldType(e.target.value as FieldTypeName);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create form field</DialogTitle>
      <Formik
        key={fieldType}
        initialValues={CONFIG[fieldType].initialValues}
        onSubmit={(attributes) => onSubmit(attributes, fieldType)}
      >
        <>

          <DialogContent sx={{ minWidth: 570 }}>
            <Stack spacing={2}>
              <Stack
                spacing={2}
                direction="row"
                flexWrap="nowrap"
                sx={{ paddingTop: 1 }}
              >
                <SelectFieldType value={fieldType} onChange={handleChange} />
                {fieldType === "checkbox" ? null : (
                  <Field
                    component={CheckboxWithLabel}
                    name="required"
                    type="checkbox"
                    Label={{ label: "Required?" }}
                  />
                )}
              </Stack>
              <CommonFields />
              {["select"].includes(fieldType) ? <SelectOptionsForm /> : null}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <SubmitButton data-testid="add-field-btn">Create</SubmitButton>
          </DialogActions>
        </>
      </Formik>
    </Dialog>
  );
};

export default CreateInputDialog;
