import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Logger } from '../blocks/logger/logger.service';
import { AuthService } from './auth.service';

export interface IRouteData {
    name?: string
    auth?: boolean
}

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(
        private _router: Router,
        private _logger: Logger,
        private _authService: AuthService
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let data: IRouteData = route.data;
        if (!data.auth) {
            return true;
        }

        let currentUser = this._authService.getCurrentUser();
        if (!currentUser) {
            this._logger.info('Current user not found - redirecting to login page');
            this._router.navigate(['/login']);
            return false;
        }

        return true;
    }
}