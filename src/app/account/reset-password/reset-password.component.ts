import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({ templateUrl: './reset-password.component.html' })

export class ResetPasswordComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token = null;
  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    const token = this.route.snapshot.queryParams['token'];

    // Remove token from URL to privent HTTP referer leakage and possible security weakness
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    // Validate token
    this.accountService.validateResetToken(token)
      .pipe(first())
      .subscribe({
        next: () => {
          // Token passes check
          this.token = token;
          this.tokenStatus = TokenStatus.Valid;
        },
        error: () => {
          // Token fails check
          this.tokenStatus = TokenStatus.Invalid;
        }
      });
    }

    // Get form fields easily in code below and to call from angular template
    get f() { return this.resetPasswordForm.controls; }

    onSubmit() {
      this.submitted = true;

      // Clear alerts when form submitted
      this.alertService.clear();

      // Stop code if form has anything invalid
      if (this.resetPasswordForm.invalid) {
        return;
      }

      // Access API to send password update request
      this.loading = true;
      this.accountService.resetPassword(this.token, this.f.password.value, this.f.confirmPassword.value)
        .pipe(first())
        .subscribe({
          next: () => {
            // Display sucess message and redirect to login page
            this.alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true })
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: error => {
            // Display error to user
            this.alertService.error(error);
            this.loading = false;
          }
        })
    }
}
