import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateLocalePipe'
})
export class DateLocalePipe {

  constructor() { }

  transform(value: string, locale: string): any {
    if (value == null) {
      return null;
    }
    else {
      moment.locale(locale);
      return moment(value).format("MMM Do YYYY");

    }
  }
}