import * as React from 'react';
import { ISelectProps, default as Select } from './Select';
import FormField from './FormField';

const SelectField: React.SFC<ISelectProps> = props => (
  <FormField {...props}>
    <Select {...props} />
  </FormField>
);

export default SelectField;
