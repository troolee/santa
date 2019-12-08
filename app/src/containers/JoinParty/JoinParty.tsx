import * as Bulma from 'bloomer';
import React from 'react';
import { buildComponent, FormMessageBoxContent } from "../MessageBox";
import { IButtonDescriptor } from '../MessageBox/MessageBox';
import * as FormikHelpers from '../../components/FormikHelpers';
import { lookupPartyInputSchema } from '../../validationSchemas/parties';
import { Api } from '../../utils/api';
import { ToastsContainer } from '..';
import history from '../../utils/history';

interface IValues {
  code: string;
}

export default class JoinParty extends FormMessageBoxContent<IValues> {
  public validationSchema = lookupPartyInputSchema;

  public initialValues = {
    code: "",
  };

  public renderForm = () => (
    <Bulma.Content>
      <FormikHelpers.InputField
        name="code"
        label="Secret code"
        help="Your friend probably told you a secret code. This is the right place to put it..."
      />
    </Bulma.Content>
  );

  public async onSubmit({code}: IValues) {
    const party = await Api.fetchParty(code);
    if (party === null) {
      ToastsContainer.displayToast({
        kind: 'danger',
        message: 'Hm... we cannot find any party for the code. Please check the code and try again...',
      });
      return;
    }
    history.replace(`/p/${code.toUpperCase()}`);
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
