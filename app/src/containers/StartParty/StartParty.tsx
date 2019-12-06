import * as Bulma from 'bloomer';
import React from 'react';
import * as yup from 'yup';
import * as YupHelpers from '../../utils/yup';
import { buildComponent, FormMessageBoxContent } from "../MessageBox";
import { IButtonDescriptor } from '../MessageBox/MessageBox';
import * as FormikHelpers from '../../components/FormikHelpers';
// import { Api } from '../../utils/api';

interface IValues {
  name: string;
  password: string;
}

export default class StartParty extends FormMessageBoxContent<IValues> {
  public validationSchema = yup.object().shape({
    name: YupHelpers.string('Party name').required(),
    password: YupHelpers.password('Secret phrase'),
  });

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
        help="Everybody has to know this phrase to enter. Leave it blank to let everybody with a link in."
        placeholder="Optional"
      />
    </Bulma.Content>
  );

  public onSubmit(values: IValues) {
    console.log(values);
    return new Promise(done => {
      setTimeout(done, 3000);
    });
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
