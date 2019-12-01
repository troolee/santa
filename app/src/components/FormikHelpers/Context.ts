import * as React from 'react';
import { FormikProps } from 'formik';

interface IFormContext {
  formikProps?: FormikProps<any>;
  isHorizontal?: boolean;
  labelWidth?: any;
}

const FormContext = React.createContext<IFormContext>({
  isHorizontal: false,
});

export default FormContext;

export class FormContectComponent<T extends {formikProps?: FormikProps<any>}, P={}> extends React.Component<T, P> {
  static contextType = FormContext;

  public get formikProps(): FormikProps<any> {
    const formikProps = this.context.formikProps || this.props.formikProps;
    if (!formikProps) {
      throw new Error('formikProps must be specified implecitely or via context');
    }
    return formikProps;
  }
}
