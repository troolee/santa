import * as yup from 'yup';
import * as YupHelpers from 'src/utils/yup';

export const createPartyInputSchema = yup.object().shape({
  name: YupHelpers.string('Party name').required(),
  password: YupHelpers.password('Secret phrase'),
});

export const lookupPartyInputSchema = yup.object().shape({
  code: YupHelpers.string('Secret code').required(),
});

export const joinPartyInputSchema = yup.object().shape({
  party: YupHelpers.string('Party ID').required(),
  password: YupHelpers.string('Password'),
});

export const askPasswordInputSchema = yup.object().shape({
  password: YupHelpers.string('Password').required(),
});

export const leavePartyInputSchema = yup.object().shape({
  party: YupHelpers.string('Party ID').required(),
});

export const closePartyInputSchema = yup.object().shape({
  party: YupHelpers.string('Party ID').required(),
});
