import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { Role } from '@app/_models';

@Component({ 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Get form fields easily in code below and to call from angular template
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Clear alerts when form submitted
    this.alertService.clear();

    // Stop code if form has anything invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Access API to send login request
    this.loading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // Get return URL from query params or redirect to home page if none given
          // CHANGE
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          // this.router.navigateByUrl(returnURL);
          this.redirectUser();
        },
        error: error => {
          // Display error to user
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  redirectUser() {
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
