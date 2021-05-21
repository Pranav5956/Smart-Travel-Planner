import React from "react";
import {
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const CustomInput = ({
  prependFieldIcon,
  appendFieldIcon,
  options,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <>
      {prependFieldIcon && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText role="button">{prependFieldIcon}</InputGroupText>
        </InputGroupAddon>
      )}
      <Input
        invalid={!!(touched[field.name] && errors[field.name])}
        {...field}
        {...props}>
        {(props.type === "select" && options) || <></>}
      </Input>
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
