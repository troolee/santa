import * as yup from 'yup';
import moment from 'moment';

const DATE_FORMATS = [
  'D/M/Y',
  'DD/M/Y',
  'DD/M/YY',
  'DD/M/YYYY',

  'D/MM/Y',
  'DD/MM/Y',
  'DD/MM/YY',
  'DD/MM/YYYY',
];

export default function date(label: string, parseFormats=DATE_FORMATS): yup.DateSchema {
  class MomentDateSchemaType extends yup.date {
    private validFormats: string[];

    constructor(validFormats: string[]) {
      super();
      this.validFormats = validFormats;

      this.withMutation(() => {
        this.transform(function(value, originalValue) {
          if (this.isType(value)) {
            return value;
          }
          return moment(originalValue, this.validFormats, true);
        });
      });
    }

    public _typeCheck(value: any) {
      return moment.isMoment(value) && value.isValid();
    }

    public format(formats: any) {
      if (!formats) {
        throw new Error('must enter a valid format');
      }
      const next = this.clone();
      next.validFormats = next.validFormats.concat(formats);
    }
  }

  return new MomentDateSchemaType(parseFormats)
    .label(label)
}
