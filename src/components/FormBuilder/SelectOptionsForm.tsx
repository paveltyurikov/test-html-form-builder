import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, Stack } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";
import { TextField } from "formik-mui";
import { OPTION_INITIAL } from "./constants";
import { Option, RowHelpersProps } from "./types";


const RowHelpers = ({ arrayHelpers, index }: RowHelpersProps) => {
  return (
    <>
      <IconButton
        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
      >
        <RemoveIcon />
      </IconButton>
      <IconButton onClick={() => arrayHelpers.insert(index, OPTION_INITIAL)}>
        <AddIcon />
      </IconButton>
    </>
  );
};

const SelectOptionsForm = () => {
  const { values } = useFormikContext<any>();
  return (
    <FieldArray
      name="options"
      render={(arrayHelpers) => (
        <Stack direction="column" spacing={2}>
          {values.options.map((_: Option, index: number) => (
            <Stack key={index} spacing={2} direction="row" alignItems="center">
              <Field
                size="small"
                label="Option title"
                inputProps={{ "data-testid": `options.${index}.label` }}
                component={TextField}
                name={`options.${index}.label`}
              />
              <Field
                size="small"
                label="Option value"
                inputProps={{ "data-testid": `options.${index}.value` }}
                component={TextField}
                name={`options.${index}.value`}
              />
              <RowHelpers index={index} arrayHelpers={arrayHelpers} />
            </Stack>
          ))}
          <Button
            type="button"
            onClick={() => arrayHelpers.push(OPTION_INITIAL)}
          >
            Add option
          </Button>
        </Stack>
      )}
    />
  );
};
export default SelectOptionsForm;
