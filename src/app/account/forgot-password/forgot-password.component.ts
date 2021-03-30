import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '@app/_services';

@Component({ templateUrl: './forgot-password.component.html' })

export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup;
	loading = false;
	submitted = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService
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
			
			// Stop code if form has anything invalid
			if (this.forgotPasswordForm.invalid) {
				return;
			}
			
			// Access API to send password reset email
			this.loading = true;
			this.accountService.forgotPassword(this.f.email.value)
			.pipe(first())
			.pipe(finalize(() => this.loading = false))
			.subscribe({
				next: () => {
					this.snackBar.open('Please check your email to reset your password.', 'Close', { duration: 10000 });
					this.router.navigate(['../login'], { relativeTo: this.route })
				},
				error: error => this.snackBar.open(error, 'Close', { duration: 10000 })
			});
		}
		
	}
