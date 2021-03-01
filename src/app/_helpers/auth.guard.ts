import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // Validate user access to route based on role
            if (route.data.roles && !route.data.roles.includes(account.role)) {
                // Redirect to home page if user is not authorized
                this.router.navigate(['/']);
                return false;
            }

            // User is authorized, returning true
            return true;
        }

        // Redirect user to login page, not logged in
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
