import * as React from 'react';
import { IInputProps, default as Input } from './Input';
import FormField from './FormField';

const InputField: React.SFC<IInputProps> = props => (
  <FormField {...props}>
    <Input {...props} />
  </FormField>
);

export default InputField;
