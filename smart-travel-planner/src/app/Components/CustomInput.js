import React from "react";
import {
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const CustomInput = ({
  appendFieldIcon,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <>
      <Input
        invalid={!!(touched[field.name] && errors[field.name])}
        {...field}
        {...props}
      />
      {appendFieldIcon && (
        <InputGroupAddon addonType="append">
          <InputGroupText role="button">{appendFieldIcon}</InputGroupText>
        </InputGroupAddon>
      )}
      {touched[field.name] && errors[field.name] && (
        <FormFeedback>{errors[field.name]}</FormFeedback>
      )}
    </>
  );
};

export default CustomInput;
