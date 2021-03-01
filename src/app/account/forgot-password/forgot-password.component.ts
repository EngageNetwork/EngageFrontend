import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { Alert } from '@app/_models';

@Component({ templateUrl: './forgot-password.component.html' })

export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Get form fields easily in code below and to call from angular template
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Clear alerts when form submitted
    this.alertService.clear();

    // Stop code if form has anything invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Access API to send password reset email
    this.loading = true;
    this.alertService.clear(); // Clear alerts again
    this.accountService.forgotPassword(this.f.email.value)
      .pipe(first())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.alertService.success('Please check your email to reset your password.'),
        error: error => this.alertService.error(error)
      });
  }

}
