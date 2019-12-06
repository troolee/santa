import * as Bulma from 'bloomer';
import React from 'react';
import { buildComponent, FormMessageBoxContent } from "../MessageBox";
import { IButtonDescriptor } from '../MessageBox/MessageBox';
import * as FormikHelpers from '../../components/FormikHelpers';
import { createPartyInputSchema } from '../../validationSchemas/parties';
import { Api } from '../../utils/api';

interface IValues {
  name: string;
  password: string;
}

export default class StartParty extends FormMessageBoxContent<IValues> {
  public validationSchema = createPartyInputSchema;

  public initialValues = {
    name: "",
    password: "",
  };

  public renderForm = () => (
    <Bulma.Content>
      <FormikHelpers.InputField
        name="name"
        label="Party name"
      />
      <FormikHelpers.InputField
        name="password"
        label="Secret phrase"
        help="Everybody has to know this phrase to enter. Leave it blank to let anyone with a link in."
        placeholder="Optional"
      />
    </Bulma.Content>
  );

  public async onSubmit(values: IValues) {
    const data = await Api.createParty(values);
    console.log(data);
  }
};

export const StartPartyComponent = buildComponent({
  title: "Let's start a new party!",
  width: 600,
  buttons: [
    {caption: 'Hah, never mind', action: 'dismiss'} as IButtonDescriptor,
    {caption: <>&#x1F389; Rock'n'Roll!</>, action: 'submit', className: 'is-primary'}
  ],
  className: 'party-box',
  contextPath: '/',
})(StartParty);
