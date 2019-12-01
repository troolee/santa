import * as Bulma from 'bloomer';
import { ErrorMessage, FormikProps } from 'formik';
import * as React from 'react';
import { FormContectComponent } from './Context';

export interface IFormFieldProps {
  formikProps?: FormikProps<any>;
  name: string;
  help?: string;
  label?: string;
  labelWidth?: any;
  isHorizontal?: boolean;
  disabled?: boolean;
}

export class FormField extends FormContectComponent<IFormFieldProps> {
  public render() {
    const isHorizontal = this.props.isHorizontal === undefined ? this.context.isHorizontal : this.props.isHorizontal;
    const labelWidth = this.props.labelWidth === undefined ? this.context.labelWidth : this.props.labelWidth;

    const isErrorDisplayed = this.formikProps.touched[this.props.name] && this.formikProps.errors[this.props.name];

    const renderHorizontalLabel = () => (
      <Bulma.FieldLabel isNormal={true}>
        <Bulma.Label style={{width: labelWidth}}>{this.props.label}</Bulma.Label>
      </Bulma.FieldLabel>
    );

    const renderVerticalLabel = () => (
      <Bulma.Label>{this.props.label}</Bulma.Label>
    );

    const renderLabel = () => isHorizontal ? renderHorizontalLabel() : renderVerticalLabel();

    const renderControl = () => {
      if (typeof this.props.children === 'function') {
        return this.props.children(this.props);
      }
      else {
        return <>{this.props.children}</>;
      }
    };

    const renderInput = () => (
      <>
        <Bulma.Control>
          {renderControl()}
        </Bulma.Control>
        <ErrorMessage name={this.props.name}>{msg => <p className="help is-danger">{msg}</p>}</ErrorMessage>
        {!isErrorDisplayed && this.props.help && <Bulma.Help>{this.props.help}</Bulma.Help>}
      </>
    );

    const renderHorizontal = () => (
      <Bulma.FieldBody>
        <Bulma.Field>
          {renderInput()}
        </Bulma.Field>
      </Bulma.FieldBody>
    );

    const renderVertical = () => (
      <>
        {renderInput()}
      </>
    );

    return (
      <Bulma.Field isHorizontal={isHorizontal}>
        {this.props.label && renderLabel()}
        {isHorizontal ? renderHorizontal() : renderVertical()}
      </Bulma.Field>
    );
  }
};

export default FormField;
