import * as Bulma from 'bloomer';
import React from 'react';
import * as yup from 'yup';
import * as YupHelpers from '../../utils/yup';
import { buildComponent, FormMessageBoxContent } from "../MessageBox";
import { IButtonDescriptor } from '../MessageBox/MessageBox';
import * as FormikHelpers from '../../components/FormikHelpers';

interface IValues {
  code: string;
}

export default class JoinParty extends FormMessageBoxContent<IValues> {
  public validationSchema = yup.object().shape({
    code: YupHelpers.string('Secret code').required(),
  });

  public initialValues = {
    code: "",
  };

  public renderForm = () => (
    <Bulma.Content>
      <FormikHelpers.InputField
        name="code"
        label="Secret code"
        help="Your friend probably told you a secret code. This is a right place to put it..."
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

export const JoinPartyComponent = buildComponent({
  title: "Join a party!",
  width: 500,
  buttons: [
    {caption: 'Hah, never mind', action: 'dismiss'} as IButtonDescriptor,
    {caption: <>&#x1F973; Here I come!</>, action: 'submit', className: 'is-primary'},
  ],
  className: 'party-box',
  contextPath: "/",
})(JoinParty);
