import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
    name: 'idTextFormatter',
    pure: false
})
@Injectable()
export class TextFormatterPipe implements PipeTransform {
    transform(text: string): string {
        return text.replace(/\n/g, '<br>');
    }
}
