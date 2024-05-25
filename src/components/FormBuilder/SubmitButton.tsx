import React from "react";
import { Button, ButtonProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormikContext } from "formik";


const SubmitButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { dirty, isValid, isSubmitting, submitForm } = useFormikContext();
  const disableButton = !dirty || !isValid || isSubmitting;

  const startIcon = isSubmitting ? <CircularProgress size={16} /> : null;
  return (
    <Button
      variant="contained"
      type="submit"
      {...props}
      onClick={submitForm}
      disabled={disableButton}
      startIcon={startIcon}
    />
  );
};

export default SubmitButton;