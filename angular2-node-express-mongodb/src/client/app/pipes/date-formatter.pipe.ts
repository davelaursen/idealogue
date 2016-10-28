import {Pipe, PipeTransform, Injectable} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'idDateFormatter',
    pure: false
})
@Injectable()
export class DateFormatterPipe implements PipeTransform {
    transform(dateStr: any): any {
        return moment(dateStr).format('M/DD/YYYY');
    }
}
