import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({ templateUrl: 'layout.component.html' })

export class LayoutComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // Redirect to home if user is already logged in
    if (this.accountService.accountValue) {
      const role = this.accountService.accountValue.role;
      if (role == Role.Admin) {
        this.router.navigate(['/admin']);
      } else if (role == Role.Tutor) {
        this.router.navigate(['/tutor']);
      } else if (role == Role.Student) {
        this.router.navigate(['/student']);
      }
    }
  }
}
