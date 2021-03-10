import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: './register.component.html' })

export class RegisterComponent implements OnInit {
	registrationForm: FormGroup;
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
			this.registrationForm = this.formBuilder.group({
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
		get f() { return this.registrationForm.controls; }
		
		onSubmit() {
			this.submitted = true;
			
			// Stop code if form has anything invalid
			if (this.registrationForm.invalid) {
				return;
			}
			
			// Access API to send registration request
			this.loading = true;
			this.accountService.register(this.registrationForm.value)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message and instructions to user, and redirects to login page
					this.snackBar.open('Registration successful, please check your email for verification instructions', 'Close', { duration: 10000 });
					this.router.navigate(['../login'], { relativeTo: this.route });
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					this.loading = false;
				}
			})
		}
	}
