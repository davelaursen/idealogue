import {Pipe, PipeTransform, Injectable} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'idDateTimeFormatter',
    pure: false
})
@Injectable()
export class DateTimeFormatterPipe implements PipeTransform {
    transform(dateStr: any): any {
        return moment(dateStr).format('M/DD/YYYY h:mm a');
    }
}
