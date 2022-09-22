import React from 'react';
import { ObjectSchema } from 'yup';
import { Formik } from 'formik';
import { FormContext } from 'src/components/FormikHelpers';

interface IProps<P> {
  initialValues?: P;
  validationSchema: ObjectSchema;
  onSubmit?: (v: P) => void | Promise<void>;

  isHorizontal?: boolean;
  labelWidth?: any;
};

export default class Form<P = {}> extends React.Component<IProps<P>> {
  private formik: any | null = null;

  public render() {
    const onSubmit = async (v: any) => {
      if (this.props.onSubmit) {
        const data = this.props.validationSchema.cast(v);
        await Promise.resolve(this.props.onSubmit(data as any));
      }
    };

    // This solution is ugly as fuck, but for now it works. Needs to be re-thinking thought.
    const prepareFormik = (fp: any) => {
      this.formik = fp;
      return fp;
    };

    return (
      <Formik
        initialValues={this.props.initialValues || {}}
        validationSchema={this.props.validationSchema}
        onSubmit={onSubmit}
      >
        {
          fp => (
            <FormContext.Provider
              value={{
                formikProps: prepareFormik(fp),
                isHorizontal: this.props.isHorizontal,
                labelWidth: this.props.labelWidth,
              }}
            >
              {this.props.children}
            </FormContext.Provider>
          )
        }
      </Formik>
    );
  }

  public async submit() {
    return await this.formik.submitForm();
  }
}
