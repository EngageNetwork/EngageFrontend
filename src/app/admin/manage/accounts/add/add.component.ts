import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add.component.html' })

export class AddComponent implements OnInit {
  createAccountForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Create User | Admin');

    this.createAccountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // Get form fields easily in code below and to call from angular template
  get f() { return this.createAccountForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Clear alerts when form submitted
    this.alertService.clear();

    // Stop code if form has anything invalid
    if (this.createAccountForm.invalid) {
      return;
    }

    // Access API to send registration request
    this.loading = true;
    this.accountService.create(this.createAccountForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // Display success message to admin and redirects to accounts list page
          this.alertService.success('Account created successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          // Display error to administrator
          this.alertService.error(error);
          this.loading = false;
        }
      })
  }
}
