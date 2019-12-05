import * as yup from 'yup';

export default function password(label: string): yup.StringSchema {
  return yup
    .string()
    .label(label)
    .ensure()
    .trim()
}
