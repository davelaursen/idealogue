import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { DataService } from './blocks/data/data.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(
        router: Router,
        dataService: DataService,
        authService: AuthService
    ) {
        dataService.setInterceptor(
            (res: Response) => {
                if (res.status === 401) {
                    authService.logout();
                    router.navigate(['/login']);
                    return null;
                }
                return res;
            }
        );
    }
}
