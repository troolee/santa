import * as yup from 'yup';
import * as YupHelpers from '../utils/yup';

export const createPartyInputSchema = yup.object().shape({
  name: YupHelpers.string('Party name').required(),
  password: YupHelpers.password('Secret phrase'),
});

export const joinPartyInputSchema = yup.object().shape({
  code: YupHelpers.string('Secret code').required(),
});
