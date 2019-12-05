import React from 'react';
import { ObjectSchema } from 'yup';
import { Formik } from 'formik';
import { FormContext } from '.';

interface IProps<P> {
  initialValues?: P;
  validationSchema: ObjectSchema;
  onSubmit?: (v: P) => Boolean | Promise<Boolean>;

  isHorizontal?: boolean;
  labelWidth?: any;
};

export default class Form<P = {}> extends React.Component<IProps<P>> {
  private refSubmitButton = React.createRef<HTMLInputElement>();
  private workDoneNotifiers: Array<() => void> = [];

  public render() {
    const initialValues = this.props.initialValues || {};

    const onSubmit = async (v: any) => {
      if (this.props.onSubmit) {
        const data = this.props.validationSchema.cast(v);
        await Promise.resolve(this.props.onSubmit(data as any));
      }
      this.workDoneNotifiers.forEach(done => done());
      this.workDoneNotifiers = [];
    };

    return (
      <Formik initialValues={initialValues} validationSchema={this.props.validationSchema} onSubmit={onSubmit}>
        {
          fp => (
            <>
              <input type="submit" ref={this.refSubmitButton} onClick={fp.submitForm} style={{display: 'none'}} />
              <FormContext.Provider
                value={{
                  formikProps: fp,
                  isHorizontal: this.props.isHorizontal,
                  labelWidth: this.props.labelWidth,
                }}
              >
                {this.props.children}
              </FormContext.Provider>
            </>
          )
        }
      </Formik>
    );
  }

  public submit() {
    return new Promise(done => {
      if (this.refSubmitButton.current) {
        this.workDoneNotifiers.push(done);
        this.refSubmitButton.current.click();
      }
      else {
        done();
      }
    });
  }
}
