import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({ 
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
	) { }
		
	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});``
	}
	
	// Get form fields easily in code below and to call from angular template
	get f() { return this.loginForm.controls; }
	
	onSubmit() {
		this.submitted = true;
		
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
				// Display success message
				this.snackBar.open('Logged in as: ' + this.accountService.accountValue.firstName + ' ' + this.accountService.accountValue.lastName, 'Close', { duration: 4000 });
				this.redirectUser();
			},
			error: error => {
				// Display error to user
				this.snackBar.open(error, 'Close', { duration: 10000 });
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
	