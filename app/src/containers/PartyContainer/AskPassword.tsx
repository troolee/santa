import * as Bulma from 'bloomer';
import React from 'react';
import { MessageBox, FormMessageBoxContent } from '../MessageBox';
import { IButtonDescriptor } from '../MessageBox/MessageBox';
import * as FormikHelpers from 'src/components/FormikHelpers';
import { askPasswordInputSchema } from '../../validationSchemas/parties';

interface IValues {
  password: string;
}

export default class AskPassword extends FormMessageBoxContent<IValues> {
  public validationSchema = askPasswordInputSchema;

  public initialValues = {
    password: "",
  };

  public isHorizontal = false;

  public static async showMessageBox() {
    return await MessageBox.showMessageBox({
      title: 'One more thing...',
      content: props => <AskPassword {...props} />,
      width: 500,
      className: 'party-box',
      buttons: [
        {caption: "I don't know...", action: 'dismiss'} as IButtonDescriptor,
        {caption: <>&#x1F36D; I got this!</>, action: 'submit', className: 'is-primary'},
      ]
    });
  }

  public renderForm = () => (
    <Bulma.Content>
      <p>Before we let you in, please enter a secret phrase you've been told (we hope)...
      </p>
      <FormikHelpers.InputField
        name="password"
        label="Secret phrase"
        help="We beleave your friend didn't forget to tell it to you..."
      />
    </Bulma.Content>
  )

  public async onSubmit(values: IValues) {
    this.props.messageBox!.done(values);
  }
}
