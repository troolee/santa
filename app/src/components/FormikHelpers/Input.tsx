import * as Bulma from 'bloomer';
import * as React from 'react';
import { IFormFieldProps } from "./FormField";
import { FormContectComponent } from './Context';

export interface IInputProps extends IFormFieldProps {
  readOnly?: boolean;
  autoComplete?: boolean;
  placeholder?: string;
  inputStyle?: any;
  maxLength?: number;
}

export class Input extends FormContectComponent<IInputProps> {
  public render() {
    const props = this.props;
    const isErrorDisplayed = this.formikProps.touched[props.name] && this.formikProps.errors[props.name];
    return (
      <Bulma.Input
        {...this.formikProps.getFieldProps(props.name)}
        disabled={props.disabled || this.formikProps.isSubmitting}

        autoComplete={props.autoComplete ? "on" : "off"}
        className={`
          ${isErrorDisplayed ? 'is-danger' : ''}
          ${props.readOnly ? 'is-readonly' : ''}
        `.trim()}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        style={props.inputStyle}
        maxLength={props.maxLength}
      />
    );
  }
}

export default Input;
