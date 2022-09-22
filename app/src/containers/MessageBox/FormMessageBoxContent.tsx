import * as React from 'react';
import { MessageBoxContent } from 'src/containers/MessageBox';
import * as FormikHelpers from 'src/components/FormikHelpers';
import { IMessageBoxContentProps } from 'src/containers/MessageBox/MessageBoxContent';
import { ObjectSchema } from 'yup';

export default abstract class FormMessageBoxContent<T> extends MessageBoxContent {
  public labelWidth = 150;
  public isHorizontal = true;
  public validationSchema: ObjectSchema | null = null;
  public initialValues: T | null = null;
  public ref = React.createRef<FormikHelpers.Form>();

  public render() {
    const onSubmit = async(values: T) => await this.onSubmit(values);

    return (
      <FormikHelpers.Form {...this} validationSchema={this.validationSchema!} onSubmit={onSubmit}>
        {this.renderForm()}
      </FormikHelpers.Form>
    );
  }

  public abstract renderForm(): React.ReactNode;

  public async onButtonClick(props: IMessageBoxContentProps, id: string) {
    if (id === 'submit' && this.ref.current) {
      await this.ref.current.submit();
    }
  }

  public abstract onSubmit(values: T): Promise<any>;
};
