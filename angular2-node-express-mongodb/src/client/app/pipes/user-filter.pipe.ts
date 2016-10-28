import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
    name: 'idUserFilter',
    pure: false
})
@Injectable()
export class UserFilterPipe implements PipeTransform {
    transform(users: any[], filter: any): any[] {
        return users.filter(user => {
            return user.username.toLowerCase().indexOf(filter) >= 0 ||
                user.firstName.toLowerCase().indexOf(filter) >= 0 ||
                user.lastName.toLowerCase().indexOf(filter) >= 0;
        });
    }
}
