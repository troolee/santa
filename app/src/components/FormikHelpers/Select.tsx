import * as Bulma from 'bloomer';
import * as React from 'react';
import { IFormFieldProps } from "./FormField";
import { FormContectComponent } from './Context';

export interface ISelectProps extends IFormFieldProps {
  readOnly?: boolean;
  inputStyle?: any;
}

export class Select extends FormContectComponent<ISelectProps> {
  public render() {
    const props = this.props;
    const isErrorDisplayed = this.formikProps.touched[props.name] && this.formikProps.errors[props.name];
    return (
      <Bulma.Select
        {...this.formikProps.getFieldProps(props.name)}
        disabled={props.disabled || this.formikProps.isSubmitting}

        className={`
          ${isErrorDisplayed ? 'is-danger' : ''}
          ${props.readOnly ? 'is-readonly' : ''}
        `.trim()}
        readOnly={props.readOnly}
        style={props.inputStyle}
      >
        {this.props.children}
      </Bulma.Select>
    );
  }
}

export default Select;
