import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeZonePipe'
})
export class TimeZonePipe {

  constructor() { }

  transform(timeValue: string, dateValue: string, timezone: string, locale: string): any {
    if (timeValue == null) {
      return null;
    }
    else {
      moment.locale(locale)
      return moment(dateValue + "T" + timeValue).tz(timezone).format('hh:mm A');
    }
  }
}