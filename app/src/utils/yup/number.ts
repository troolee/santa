import * as yup from 'yup';

export default function number(label: string): yup.NumberSchema<number | null> {
  return yup
    .number()
    // eslint-disable-next-line
    .typeError('${path} must be a valid number')
    .label(label)
    .transform((v, ov) => {
      const parsed = parseFloat(v);
      if (!isNaN(parsed)) {
        return parsed;
      }
      if (!ov || !ov.trim()) {
        return null;
      }
      return ov;
    })
    .nullable(true);
}
